import React, { useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Phone,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  IndianRupee,
  Bold,
  Plus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  createRazorpayOrder,
  fetchWalletDetails,
  fetchWalletChatStatistics,
  verifyRazorpayPayment,
  fetchRechargeHistory,
  fetchPayoutHistory,
  createPayoutRequest,
} from "@/redux/slice/walletSlice";
import { toast } from "react-toastify";
import { openRechargeModal } from "@/redux/slice/uiSlice";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function WalletDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { astrologer } = useSelector((state) => state.astroAuth);
  const { user } = useSelector((state) => state.userAuth);
  const { details, loading, chatStatistics } = useSelector(
    (state) => state.wallet,
  );
  const { chatHistory } = useSelector((state) => state.aiChat);

  // console.log("chatHistory",chatHistory)
  
  console.log("wwallet details", details);
  console.log("chatStatistics", chatStatistics);
  useEffect(() => {
    dispatch(fetchWalletDetails());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchRechargeHistory());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchWalletChatStatistics());
  }, [dispatch]);

  if (loading && !details) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-500 animate-pulse">
          Loading Wallet Data...
        </div>
      </div>
    );
  }

  // Use only real data. If details is undefined, we use fallback 0s to prevent crash before loading triggers, though the loading check above handles it mostly.
  const walletData = details || {};
  console.log("walletData?.data", walletData);

  const formatCurrency = (amount) => `₹${parseFloat(amount).toFixed(2)}`;
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    trend,
    colorClass,
    borderColor,
  }) => (
    <Card className={`overflow-hidden  ${borderColor}  p-6 `}>
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-slate-600 mb-1">{title}</p>
            <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
            {trend && (
              <Badge variant="outline" className="text-xs">
                {trend}
              </Badge>
            )}
          </div>

          <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10 `}>
            <Icon className={`w-6 h-6 ${colorClass}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const InfoRow = ({ label, value, icon: Icon ,className=null}) => (
    <div className={`flex ${className} items-center justify-between py-3 border-b last:border-0`}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {Icon && <Icon className="w-4 h-4" />}
        <span>{label}</span>
      </div>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
              <Wallet className="w-8 h-8 text-primary" />
              Wallet Dashboard
            </h1>
            <p className="text-muted-foreground">
              Track your earnings, spending, and wallet balance
            </p>
          </div>
          <button
            onClick={() => dispatch(openRechargeModal())}
            className="bg-amber-500 hover:bg-amber-600 text-gray-710 px-6 py-2.5 rounded-lg font-semibold shadow-md transition-colors flex items-center justify-center gap-0 shrink-0 cursor-pointer"
          >
            <Plus className="w-5 h-5 " />
            Add Money to Wallet
          </button>
        </div>

        {/* Main Balance Card */}
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-blue-50 to-white ">
          <CardContent className="p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wallet className="w-4 h-4" />
                <span>Current Balance</span>
              </div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-5xl font-bold text-primary">
                  {formatCurrency(walletData?.data?.balance || 0)}
                </h2>
                {/* <Badge variant="outline" className="text-xs">
                  Wallet ID: {walletData?.data.id || "N/A"}
                </Badge> */}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-medium">
                    {formatDate(walletData?.data?.last_recharge_at)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    Account Created
                  </p>
                  <p className="text-sm font-medium">
                    {formatDate(walletData?.data?.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* <StatCard
            icon={TrendingUp}
            title="Total Earned"
            value={formatCurrency(walletData?.data?.total_earned || 0)}
            colorClass="text-green-600"
            borderColor={'border-green-200 bg-green-50'}
          />
          <StatCard
            icon={TrendingDown}
            title="Total Withdrawn"
            value={formatCurrency(walletData?.data.total_withdrawn || 0)}
            colorClass="text-orange-600"
            borderColor={'border-orange-200 bg-orange-50'}
          /> */}
          <StatCard
            icon={ArrowDownRight}
            title="Total Added"
            value={formatCurrency(walletData?.data?.total_added || 0)}
            colorClass="text-blue-600"
            borderColor={"border-blue-200 bg-blue-50"}
          />
          <StatCard
            icon={ArrowDownRight}
            title="Total Spent"
            value={formatCurrency(walletData?.data?.total_spent || 0)}
            colorClass="text-red-600"
            borderColor={"border-red-200 bg-red-50"}
          />
        </div>

        {/* Service Usage */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className={"border-2 border-green-300 p-6"}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-600" />
                Call Statistics
              </CardTitle>
              <CardDescription>Your call consultation metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <InfoRow
                label="Total Call Duration"
                value={`${walletData?.data?.total_call_minutes || 0} minutes`}
                icon={Clock}
              />
              <InfoRow
                label="Total Call Revenue"
                value={formatCurrency(walletData?.data?.total_call_spent || 0)}
                icon={IndianRupee}
              />
              <InfoRow
                label="Average Per Minute"
                value={
                  (walletData?.data?.total_call_minutes || 0) > 0
                    ? formatCurrency(
                        (
                          parseFloat(walletData?.data?.total_call_spent || 0) /
                          walletData?.data?.total_call_minutes
                        ).toFixed(2),
                      )
                    : "₹0.00"
                }
                icon={TrendingUp}
              />
            </CardContent>
          </Card>

          <Card className={"border-2 border-primary/30 p-6"}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                Chat Statistics
              </CardTitle>
              <CardDescription>Your chat consultation metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              <InfoRow
                label="Paid Messages Count"
                value={`${chatStatistics?.summary?.total_paid_chats || 0} `}
                icon={Clock}
              />
              <InfoRow
                label="Free Messages Count"
                value={`${chatStatistics?.summary?.total_free_chats || 0} `}
                icon={IndianRupee}
              />
              <InfoRow
                label="Total Spent"
                value={`${chatStatistics?.summary?.total_spent || 0} `}
                icon={TrendingUp}
              />

              <InfoRow
                label="All Connected Astrologers"
                icon={MessageSquare}
                className="flex-col gap-2 sm:flex-row sm:gap-0"
                value={
                  <Select onValueChange={(value) => navigate(value)}>
                    <SelectTrigger className="font-normal text-sm w-full sm:w-auto min-w-0">
                      <SelectValue placeholder="Select astrologer" />
                    </SelectTrigger>
                    <SelectContent>
                      {chatStatistics?.history?.length > 0 ? (
                        chatStatistics.history.map((item) => (
                          <SelectItem
                            key={item.astrologer.slug || item.id}
                            value={`/ai-chat/${item?.astrologer?.slug}/${item?.expertise.slug}`}
                          >
                            {item.astrologer.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-gray-400 text-center">
                          No chats yet
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                }
              />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className={"border-2 border-primary/30 p-6"}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest wallet transactions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <InfoRow
                label="Last Recharge Amount"
                value={
                  walletData?.data?.last_recharge_amount
                    ? formatCurrency(walletData?.data?.last_recharge_amount)
                    : "No recharge yet"
                }
                icon={ArrowUpRight}
              />
              <InfoRow
                label="Last Recharge Date"
                value={formatDate(walletData?.data?.last_recharge_at)}
                icon={Calendar}
              />
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card className={"border-2 border-primary/30 p-6"}>
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
            <CardDescription>Overview of your wallet account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Account Status
                </p>
                <Badge variant="outline" className="text-sm">
                  {walletData?.data?.deleted_at ? "Inactive" : "Active"}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  User Name
                </p>
                <p className="text-sm font-mono uppercase">
                  {walletData?.user?.name || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Wallet Age
                </p>
                <p className="text-sm font-mono">{walletData?.data?.wallet_age || "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WalletDashboard;
