// src/pages/WalletDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchWalletDetails,
  fetchRechargeHistory,
  fetchPayoutHistory,
  createPayoutRequest,
  clearWalletError,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from '../../redux/slice/walletSlice';
import { Wallet, TrendingUp, TrendingDown, Phone, MessageSquare, DollarSign, ArrowUpRight, ArrowDownRight, Calendar, Clock, IndianRupee, PlusCircle, CreditCard, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-toastify';
import Loader from '@/components/common/Loader';

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const WalletDashboard = () => {
  const dispatch = useDispatch();
  const { details, rechargeHistory, payoutHistory, loading, error } = useSelector((state) => state.wallet);
  const { isLoggedIn } = useSelector((state) => state.userAuth);
  const [role, setRole] = useState(localStorage.getItem('role_id'));
  const [amount, setAmount] = useState('');
  const [adding, setAdding] = useState(false);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchWalletDetails());
      // if (role === '2') dispatch(fetchPayoutHistory());
    }
  }, [dispatch, isLoggedIn, role]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearWalletError());
    }
  }, [error, dispatch]);

  const formatCurrency = (amount) => `₹${parseFloat(amount).toFixed(2)}`;
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleAddMoney = async (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setAdding(true);
    try {
      const orderData = await dispatch(createRazorpayOrder(numAmount)).unwrap();
      const { order_id, amount: orderAmount, currency = 'INR' } = orderData;
      if (!order_id) throw new Error("Order ID missing");

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) throw new Error("Razorpay script failed");

      if (!RAZORPAY_KEY) throw new Error("Razorpay key missing");

      const amountInPaise = Math.round(orderAmount * 100);
      const options = {
        key: RAZORPAY_KEY,
        amount: amountInPaise,
        currency,
        name: 'AstroTring',
        description: `Add ₹${numAmount} to wallet`,
        order_id,
        handler: async (response) => {
          try {
            await dispatch(verifyRazorpayPayment({
              paymentData: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              amount: numAmount,
            })).unwrap();
            toast.success(`₹${numAmount} added to wallet successfully!`);
            setAmount('');
            setShowAddMoney(false);
          } catch (err) {
            toast.error('Payment verification failed. Please contact support.');
          }
        },
        modal: { ondismiss: () => toast.info('Payment cancelled') },
        prefill: { name: '', email: '', contact: '' },
        theme: { color: '#ea580c' },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', () => toast.error('Payment failed. Please try again.'));
      razorpay.open();
    } catch (err) {
      toast.error(err.message || 'Failed to initiate payment');
    } finally {
      setAdding(false);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const numAmount = parseFloat(withdrawAmount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Please enter a valid withdrawal amount');
      return;
    }
    if (details && numAmount > parseFloat(details.balance)) {
      toast.error('Insufficient balance');
      return;
    }

    setWithdrawing(true);
    try {
      await dispatch(createPayoutRequest(numAmount)).unwrap();
      toast.success('Withdrawal request submitted successfully');
      setWithdrawAmount('');
      dispatch(fetchWalletDetails());
      if (role === '2') dispatch(fetchPayoutHistory());
    } catch (err) {
      toast.error(err || 'Failed to submit withdrawal request');
    } finally {
      setWithdrawing(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Please log in to view your wallet.</p>
      </div>
    );
  }

  if (loading && !details) return <Loader data="Loading wallet..." />;
  if (!details && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Failed to load wallet data. Please try again later.</p>
      </div>
    );
  }

  const walletData = details;
  const isUser = role === '3';
  const isAstrologer = role === '2';

  const userStats = [
    { icon: DollarSign, title: "Total Added", value: formatCurrency(walletData.total_added ?? 0), colorClass: "text-blue-600", borderColor: "border-blue-200 bg-blue-50" },
    { icon: ArrowDownRight, title: "Total Spent", value: formatCurrency(walletData.total_spent ?? 0), colorClass: "text-red-600", borderColor: "border-red-200 bg-red-50" }
  ];

  const astrologerStats = [
    { icon: TrendingUp, title: "Total Earned", value: formatCurrency(walletData.total_earned ?? 0), colorClass: "text-green-600", borderColor: "border-green-200 bg-green-50" },
    { icon: TrendingDown, title: "Total Withdrawn", value: formatCurrency(walletData.total_withdrawn ?? 0), colorClass: "text-orange-600", borderColor: "border-orange-200 bg-orange-50" }
  ];

  const statsToShow = isUser ? userStats : isAstrologer ? astrologerStats : [];

  return (
    <div className="min-h-screen bg-slate-50 py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center sm:justify-start gap-2">
            <Wallet className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            Wallet Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Track your earnings, spending, and wallet balance</p>
        </div>

        {/* Main Balance Card with improved Add Money section */}
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <div className="space-y-5 md:space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Wallet className="w-4 h-4" />
                  <span>Current Balance</span>
                </div>
                {isUser && !showAddMoney && (
                  <button
                    onClick={() => setShowAddMoney(true)}
                    className="flex items-center gap-1 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition"
                  >
                    <PlusCircle className="w-4 h-4" /> Add Money
                  </button>
                )}
                {isUser && showAddMoney && (
                  <button
                    onClick={() => setShowAddMoney(false)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                )}
              </div>

              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold text-primary">
                  {formatCurrency(walletData.balance ?? 0)}
                </h2>
              </div>

              {/* Enhanced Add Money form */}
              {isUser && showAddMoney && (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-primary/20 shadow-sm mt-2">
                  
                  <form onSubmit={handleAddMoney} className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-end">
                    <div className="flex-1 w-full">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Add Funds to Wallet (₹)</label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                        min="1"
                        step="1"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={adding}
                      className="w-full sm:w-auto px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 flex items-center justify-center gap-2 transition"
                    >
                      {adding ? 'Processing...' : <><CreditCard className="w-4 h-4" /> Pay Now</>}
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 mt-3">Secure payment via Razorpay</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 pt-3 border-t border-primary/10">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-medium">{formatDate(walletData.updated_at)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Account Created</p>
                  <p className="text-sm font-medium">{formatDate(walletData.created_at)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role‑specific Stats Grid - responsive */}
        {statsToShow.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statsToShow.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>
        )}

        {/* Tabs - responsive horizontal scroll on mobile */}
        <div className="flex overflow-x-auto whitespace-nowrap border-b gap-4 pb-0.5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 px-1 ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
          >
            Overview
          </button>
          {isUser && (
            <button
              onClick={() => setActiveTab('recharge')}
              className={`pb-2 px-1 ${activeTab === 'recharge' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
            >
              Recharge History
            </button>
          )}
          {isAstrologer && (
            <button
              onClick={() => setActiveTab('payout')}
              className={`pb-2 px-1 ${activeTab === 'payout' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
            >
              Payout History
            </button>
          )}
        </div>

        {/* Tab Content - fully responsive */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-2 border-green-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                    Call Statistics
                  </CardTitle>
                  <CardDescription>Your call consultation metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <InfoRow label="Total Call Duration" value={`${walletData.total_call_minutes ?? 0} minutes`} icon={Clock} />
                  <InfoRow label="Total Call Revenue" value={formatCurrency(walletData.total_call_spent ?? 0)} icon={IndianRupee} />
                  <InfoRow label="Average Per Minute" value={walletData.total_call_minutes > 0 ? formatCurrency((parseFloat(walletData.total_call_spent) / walletData.total_call_minutes).toFixed(2)) : '₹0.00'} icon={TrendingUp} />
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Chat Statistics
                  </CardTitle>
                  <CardDescription>Your chat consultation metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <InfoRow label="Total Chat Duration" value={`${walletData.total_chat_minutes ?? 0} minutes`} icon={Clock} />
                  <InfoRow label="Total Chat Revenue" value={formatCurrency(walletData.total_chat_spent ?? 0)} icon={IndianRupee} />
                  <InfoRow label="Average Per Minute" value={walletData.total_chat_minutes > 0 ? formatCurrency((parseFloat(walletData.total_chat_spent) / walletData.total_chat_minutes).toFixed(2)) : '₹0.00'} icon={TrendingUp} />
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'recharge' && isUser && (
            <Card className="border-2 border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Recharge History
                </CardTitle>
                <CardDescription>Your wallet recharge transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-6">Recharge history will appear here soon.</p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'payout' && isAstrologer && (
            <Card className="border-2 border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Payout History
                </CardTitle>
                <CardDescription>Your withdrawal requests and status</CardDescription>
              </CardHeader>
              <CardContent>
                {payoutHistory.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No payout requests found.</p>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {payoutHistory.map((payout) => (
                      <div key={payout.id} className="flex flex-wrap justify-between items-center py-2 border-b last:border-0 gap-2">
                        <div>
                          <p className="font-medium">₹{payout.amount}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(payout.created_at)}</p>
                        </div>
                        <Badge variant={payout.status === 'completed' ? 'default' : 'secondary'}>{payout.status || 'Pending'}</Badge>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-6 pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-3">Request Withdrawal</h3>
                  <form onSubmit={handleWithdraw} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                      min="1"
                      step="1"
                      required
                    />
                    <button
                      type="submit"
                      disabled={withdrawing}
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {withdrawing ? 'Processing...' : <><ArrowUpRight className="w-4 h-4" /> Request Withdrawal</>}
                    </button>
                  </form>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity and Account Summary */}
          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your latest wallet transactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <InfoRow label="Last Recharge Amount" value={walletData.last_recharge_amount ? formatCurrency(walletData.last_recharge_amount) : 'No recharge yet'} icon={ArrowUpRight} />
                <InfoRow label="Last Recharge Date" value={formatDate(walletData.last_recharge_at)} icon={Calendar} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/30">
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
              <CardDescription>Overview of your wallet account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Account Status</p>
                  <Badge variant="outline" className="text-sm">{walletData.deleted_at ? 'Inactive' : 'Active'}</Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">User ID</p>
                  <p className="text-sm font-mono">{walletData.user_id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Wallet ID</p>
                  <p className="text-sm font-mono">{walletData.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper Components (unchanged, but ensure they are responsive)
const StatCard = ({ icon: Icon, title, value, colorClass, borderColor }) => (
  <Card className={`overflow-hidden ${borderColor}`}>
    <CardContent className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-600 mb-1">{title}</p>
          <p className={`text-2xl sm:text-3xl font-bold ${colorClass}`}>{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
          <Icon className={`w-5 h-5 ${colorClass}`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex flex-wrap justify-between items-center py-2 border-b last:border-0 gap-2">
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {Icon && <Icon className="w-4 h-4" />}
      <span>{label}</span>
    </div>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

export default WalletDashboard;















// import React, { useState } from 'react';
// import { Wallet, TrendingUp, TrendingDown, Phone, MessageSquare, DollarSign, ArrowUpRight, ArrowDownRight, Calendar, Clock, IndianRupee } from 'lucide-react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
// import { useSelector } from 'react-redux';

// function WalletDashboard() {
//   const { astrologer } = useSelector((state) => state.astroAuth);
//   const { user } = useSelector((state) => state.userAuth)
//   console.log("user dashbord",user)
//   console.log("astro dashbord",astrologer)
//   const [role, setRole] = useState(localStorage.getItem("role_id"))
//   const walletData = (astrologer?.wallet) || (user?.wallet) || {
//     balance: "0.00",
//     created_at: "2026-01-19T12:19:58.000000Z",
//     deleted_at: null,
//     id: 30,
//     last_recharge_amount: null,
//     last_recharge_at: null,
//     total_added: "0.00",
//     total_call_minutes: 0,
//     total_call_spent: "0.00",
//     total_chat_minutes: 0,
//     total_chat_spent: "0.00",
//     total_earned: "0.00",
//     total_spent: "0.00",
//     total_withdrawn: "0.00",
//     updated_at: "2026-01-19T12:19:58.000000Z",
//     user_id: 33
//   };

//   const formatCurrency = (amount) => `₹${parseFloat(amount).toFixed(2)}`;
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const StatCard = ({ icon: Icon, title, value, subtitle, trend, colorClass, borderColor }) => (
//     <Card className={`overflow-hidden  ${borderColor} `}>

//       <CardContent className=" ">
//         <div className="flex items-start justify-between">

//           <div>

//             <p className="text-sm text-slate-600 mb-1">{title}</p>
//             <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
//             {trend && (
//               <Badge variant="outline" className="text-xs">
//                 {trend}
//               </Badge>
//             )}
//           </div>


//           <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
//             <Icon className={`w-6 h-6 ${colorClass}`} />
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   const InfoRow = ({ label, value, icon: Icon }) => (
//     <div className="flex items-center justify-between py-3 border-b last:border-0">
//       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//         {Icon && <Icon className="w-4 h-4" />}
//         <span>{label}</span>
//       </div>
//       <span className="text-sm font-medium">{value}</span>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
//         {/* Header */}
//         <div className="space-y-2">
//           <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
//             <Wallet className="w-8 h-8 text-primary" />
//             Wallet Dashboard
//           </h1>
//           <p className="text-muted-foreground">Track your earnings, spending, and wallet balance</p>
//         </div>

//         {/* Main Balance Card */}
//         <Card className="border-2 border-primary/30 bg-gradient-to-br from-blue-50 to-white">
//           <CardContent className="p-8">
//             <div className="space-y-4">
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <Wallet className="w-4 h-4" />
//                 <span>Current Balance</span>
//               </div>
//               <div className="flex items-baseline gap-3">
//                 <h2 className="text-5xl font-bold text-primary">
//                   {formatCurrency(walletData.balance)}
//                 </h2>
//                 <Badge variant="outline" className="text-xs">
//                   Wallet ID: {walletData.id}
//                 </Badge>
//               </div>
//               <div className="grid grid-cols-2 gap-4 mt-6">
//                 <div className="space-y-1">
//                   <p className="text-xs text-muted-foreground">Last Updated</p>
//                   <p className="text-sm font-medium">{formatDate(walletData.updated_at)}</p>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-xs text-muted-foreground">Account Created</p>
//                   <p className="text-sm font-medium">{formatDate(walletData.created_at)}</p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <StatCard
//             icon={TrendingUp}
//             title="Total Earned"
//             value={formatCurrency(walletData.total_earned)}
//             colorClass="text-green-600"
//             borderColor={'border-green-200 bg-green-50'}
//           />
//           <StatCard
//             icon={TrendingDown}
//             title="Total Withdrawn"
//             value={formatCurrency(walletData.total_withdrawn)}
//             colorClass="text-orange-600"
//             borderColor={'border-orange-200 bg-orange-50'}
//           />
//           <StatCard
//             icon={DollarSign}
//             title="Total Added"
//             value={formatCurrency(walletData.total_added)}
//             colorClass="text-blue-600"
//             borderColor={'border-blue-200 bg-blue-50'}
//           />
//           <StatCard
//             icon={ArrowDownRight}
//             title="Total Spent"
//             value={formatCurrency(walletData.total_spent)}
//             colorClass="text-red-600"
//             borderColor={'border-red-200 bg-red-50'}
//           />
//         </div>

//         {/* Service Usage */}
//         <div className="grid lg:grid-cols-2 gap-6">
//           <Card className={"border-2 border-green-300"}>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Phone className="w-5 h-5 text-green-600" />
//                 Call Statistics
//               </CardTitle>
//               <CardDescription>Your call consultation metrics</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-1">
//               <InfoRow
//                 label="Total Call Duration"
//                 value={`${walletData.total_call_minutes} minutes`}
//                 icon={Clock}
//               />
//               <InfoRow
//                 label="Total Call Revenue"
//                 value={formatCurrency(walletData.total_call_spent)}
//                 icon={IndianRupee}
//               />
//               <InfoRow
//                 label="Average Per Minute"
//                 value={walletData.total_call_minutes > 0
//                   ? formatCurrency((parseFloat(walletData.total_call_spent) / walletData.total_call_minutes).toFixed(2))
//                   : '₹0.00'}
//                 icon={TrendingUp}
//               />
//             </CardContent>
//           </Card>

//           <Card className={"border-2 border-primary/30"}>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <MessageSquare className="w-5 h-5 text-blue-600" />
//                 Chat Statistics
//               </CardTitle>
//               <CardDescription>Your chat consultation metrics</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-1">
//               <InfoRow
//                 label="Total Chat Duration"
//                 value={`${walletData.total_chat_minutes} minutes`}
//                 icon={Clock}
//               />
//               <InfoRow
//                 label="Total Chat Revenue"
//                 value={formatCurrency(walletData.total_chat_spent)}
//                 icon={IndianRupee}
//               />
//               <InfoRow
//                 label="Average Per Minute"
//                 value={walletData.total_chat_minutes > 0
//                   ? formatCurrency((parseFloat(walletData.total_chat_spent) / walletData.total_chat_minutes).toFixed(2))
//                   : '₹0.00'}
//                 icon={TrendingUp}
//               />
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Activity */}
//         <Card className={"border-2 border-primary/30"}>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Calendar className="w-5 h-5 text-purple-600" />
//               Recent Activity
//             </CardTitle>
//             <CardDescription>Your latest wallet transactions and updates</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-1">
//               <InfoRow
//                 label="Last Recharge Amount"
//                 value={walletData.last_recharge_amount ? formatCurrency(walletData.last_recharge_amount) : 'No recharge yet'}
//                 icon={ArrowUpRight}
//               />
//               <InfoRow
//                 label="Last Recharge Date"
//                 value={formatDate(walletData.last_recharge_at)}
//                 icon={Calendar}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Summary Card */}
//         <Card className={"border-2 border-primary/30"}  >
//           <CardHeader>
//             <CardTitle>Account Summary</CardTitle>
//             <CardDescription>Overview of your wallet account</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid md:grid-cols-3 gap-6">
//               <div className="space-y-2">
//                 <p className="text-sm font-medium text-muted-foreground">Account Status</p>
//                 <Badge variant="outline" className="text-sm">
//                   {walletData.deleted_at ? 'Inactive' : 'Active'}
//                 </Badge>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-sm font-medium text-muted-foreground">User ID</p>
//                 <p className="text-sm font-mono">{walletData.user_id}</p>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-sm font-medium text-muted-foreground">Wallet ID</p>
//                 <p className="text-sm font-mono">{walletData.id}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// export default WalletDashboard;