import React, { useEffect, useState } from "react";
import {
  Eye,
  Download,
  Filter,
  Search,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchRechargeHistory } from "@/redux/slice/walletSlice";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";



const StatusBadge = ({ status }) => {
  const statusConfig = {
    completed: {
      color: "bg-green-100 text-green-700 border-green-300",
      icon: CheckCircle,
    },
    pending: {
      color: "bg-yellow-100 text-yellow-700 border-yellow-300",
      icon: Clock,
    },
    rejected: {
      color: "bg-red-100 text-red-700 border-red-300",
      icon: XCircle,
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={cn("capitalize", config.color)}>
      <Icon className="w-3 h-3 mr-1" />
      {status}
    </Badge>
  );
};

const TransactionDetailModal = ({ transaction, open, onClose }) => {
  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <DollarSign className="w-6 h-6 text-primary" />
            Transaction Details
          </DialogTitle>
          <DialogDescription>
            Complete information about recharge #{transaction.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex justify-between">
{/* recharge id */}
            <Card className="border-primary/20 p-2">
              <CardContent >
                <p className="text-sm text-slate-600 mb-1">Recharge ID</p>
                <p className="text-2xl font-bold text-primary">
                  {transaction.id}
                </p>
              </CardContent>
            </Card>
          {/* Amount Section */}
            <Card className="border-primary/20 p-2">
              <CardContent >
                <p className="text-sm text-slate-600 mb-1">Recharge Amount</p>
                <p className="text-2xl font-bold text-primary">
                  ₹{transaction.amount.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Transaction Details */}
          <Card className="py-4">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg">Transaction Information</CardTitle>
            </CardHeader>
            <CardContent >
              <div className="grid grid-cols-2 gap-4">
                <DetailRow label="Recharge Date" value={transaction.date} />
                <DetailRow label="Recharge Time" value={transaction.time} />
                <DetailRow label="Payment Method" value={transaction.method} />
                <DetailRow
                  label="Gateway Transaction ID"
                  value={transaction.transactionId}
                />
                <DetailRow
                  label="Balance Before Recharge"
                  value={`₹${transaction.balanceBefore.toLocaleString()}`}
                />
                <DetailRow
                  label="Balance After Recharge"
                  value={`₹${transaction.balanceAfter.toLocaleString()}`}
                />
                <DetailRow
                  label="Payment ID"
                  value={transaction.paymentId}
                />
                <DetailRow
                  label="Wallet ID"
                  value={transaction.walletId}
                />
              </div>
            </CardContent>
          </Card>

          {/* Rejection Reason (if applicable) */}
          {transaction.status === "rejected" && transaction.rejectionReason && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-red-700 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Rejection Reason
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700">{transaction.rejectionReason}</p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
            {/* <Button className="flex-1 bg-primary text-black hover:bg-orange-400">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DetailRow = ({ label, value }) => (
  <div>
    <p className="text-xs text-slate-500 mb-1">{label}</p>
    <p className="font-semibold text-slate-800">{value}</p>
  </div>
);

function WidhdrowHistory() {
 

  const [searchTerm, setSearchTerm] = useState("");
  // const [statusFilter, setStatusFilter] = useState("all");
  // const [methodFilter, setMethodFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();


  const { details, loading, rechargeHistory } = useSelector(
    (state) => state.wallet,
  );


 useEffect(() => {
    dispatch(fetchRechargeHistory(currentPage));
  }, [dispatch, currentPage]);
  
  const rechargeData = rechargeHistory?.data?.data || [];
  const pagination = rechargeHistory?.data;

  // Convert the recharge-history API response into the shape used by this table.
  const transactionHistoryData = rechargeData.map((item) => {
    const rechargedAt = new Date(item.recharged_at);

    return {
      id: item.id,
      amount: Number(item.amount),
      status: "completed",
      date: rechargedAt.toISOString().slice(0, 10),
      time: rechargedAt.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      method: item.payment_method,
      transactionId: item.gateway_txn_id,
      paymentId: item.payment_id,
      walletId: item.wallet_id,
      balanceBefore: Number(item.balance_before),
      balanceAfter: Number(item.balance_after),
    };
  });

  // Filter logic
  const filteredData = transactionHistoryData.filter((item) => {
    const matchesSearch =
      String(item.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    // const matchesStatus =
    //   statusFilter === "all" || item.status === statusFilter;
    // const matchesMethod =
    //   methodFilter === "all" || item.method === methodFilter;
    const matchesDate = !dateFilter || item.date === dateFilter;

    return matchesSearch && matchesDate;
  });



  // Statistics are currently not needed because the summary cards are hidden.
  // const stats = {
  //   total: withdrawalData.reduce((sum, item) => sum + item.amount, 0),
  //   completed: withdrawalData
  //     .filter((item) => item.status === "completed")
  //     .reduce((sum, item) => sum + item.amount, 0),
  //   pending: withdrawalData
  //     .filter((item) => item.status === "pending")
  //     .reduce((sum, item) => sum + item.amount, 0),
  //   rejected: withdrawalData.filter((item) => item.status === "rejected")
  //     .length,
  // };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3 mb-2">
            <DollarSign className="w-10 h-10 text-primary" />
            Recharge History
          </h1>
          <p className="text-slate-600">
            Track and manage all your transactions
          </p>
        </div>

        {/* Statistics Cards - currently not needed
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-orange-50">
            <CardContent className=" ">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Total Withdrawn</p>
                  <p className="text-2xl font-bold text-slate-800">
                    ₹{stats.total.toLocaleString()}
                  </p>
                </div>
                <ArrowUpRight className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className=" ">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{stats.completed.toLocaleString()}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
            <CardContent className=" ">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    ₹{stats.pending.toLocaleString()}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-gradient-to-br from-red-50 to-rose-50">
            <CardContent className=" ">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">
                    {stats.rejected} Requests
                  </p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>
        */}

        {/* Filters */}
        <Card className="py-4 border-2 border-primary/20">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              Filters
            </CardTitle>
            <CardDescription>
              Filter withdrawals by status, method, date, or search
            </CardDescription>
          </CardHeader>
          <CardContent >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="ID or Transaction..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/*
              <div className="space-y-2">
                <Label className="text-sm font-medium">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger><SelectValue placeholder="All Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Payment Method</Label>
                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger><SelectValue placeholder="All Methods" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              */}

              {/* Date Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  // setStatusFilter("all");
                  // setMethodFilter("all");
                  setDateFilter("");
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="py-4 border-2 border-primary/20">
          <CardHeader className="bg-primary/5">
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              Showing {filteredData.length} of {transactionHistoryData.length}{" "}
              transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b-2 border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Method
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Transaction ID
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-12 text-center text-slate-500"
                      >
                        No transactions found matching your filters
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p className="font-mono font-semibold text-primary">
                            {transaction.id}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-700">
                            {transaction.date}
                          </p>
                          <p className="text-xs text-slate-500">
                            {transaction.time}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-800">
                            ₹{transaction.amount.toLocaleString()}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="capitalize">
                            {transaction.method}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={transaction.status} />
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-slate-500 font-mono">
                            {transaction.transactionId}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(transaction)}
                            className="hover:bg-primary hover:text-white"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {pagination?.last_page > 1 && (
              <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
                <p className="text-sm text-slate-600">
                  Page {pagination.current_page} of {pagination.last_page}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.prev_page_url || loading}
                    onClick={() => setCurrentPage((page) => page - 1)}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.next_page_url || loading}
                    onClick={() => setCurrentPage((page) => page + 1)}
                  >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        transaction={selectedTransaction}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default WidhdrowHistory;
