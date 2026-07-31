// src/components/RechargePackList.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRazorpayOrder, verifyRazorpayPayment, fetchWalletDetails } from '@/redux/slice/walletSlice';
import { closeRechargeModal } from '@/redux/slice/uiSlice';
import { toast } from 'react-toastify';
import { IndianRupee } from 'lucide-react';

const RECHARGE_PACKS = [
  { pay: 60, label: "Get ₹60" },
  { pay: 100, label: "Get ₹100" },
  { pay: 199, label: "Get ₹199" },
  { pay: 300, label: "Get ₹300" },
  { pay: 500, label: "Get ₹500" },
  { pay: 1000, label: "Get ₹1000" },
  { pay: 2000, label: "Get ₹2000" },
  { pay: 3000, label: "Get ₹3000" },
  { pay: 5000, label: "Get ₹5000" },
  { pay: 10000, label: "Get ₹10000" },
  { pay: 15000, label: "Get ₹15000" },
  { pay: 20000, label: "Get ₹20000" },
  { pay: 50000, label: "Get ₹50000" },
  
];

const RechargePackList = () => {
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.wallet);
  const balance = details?.balance || 0;
  const { user } = useSelector((state) => state.userAuth);
  const { astrologer } = useSelector((state) => state.astroAuth);

  const handlePayment = async (amount) => {
    if (!window.Razorpay) {
      toast.error("Razorpay SDK not loaded.");
      return;
    }
    try {
      const orderData = await dispatch(createRazorpayOrder(amount)).unwrap();
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Astrotring",
        description: "Wallet Recharge",
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            await dispatch(verifyRazorpayPayment({
              paymentData: {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              amount
            })).unwrap();
            await dispatch(fetchWalletDetails()).unwrap();
            toast.success("Recharge Successful!");
            dispatch(closeRechargeModal());
          } catch (err) {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: user?.name || astrologer?.name || "",
          email: user?.email || astrologer?.email || "",
          contact: user?.mobile || astrologer?.mobile || "",
        },
        theme: { color: "#f59e0b" },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err?.message || "Payment initiation failed");
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-2xl font-semibold">Insufficient Balance</h3>
        <p className="text-sm text-gray-500">Recharge your wallet to continue</p>
        <div className="mt-2 flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
          <IndianRupee className="w-4 h-4" />
          <span className="text-sm font-medium">Balance: ₹{balance}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {RECHARGE_PACKS.map((pack) => (
          <div
            key={pack.pay}
            onClick={() => handlePayment(pack.pay)}
            className="bg-[#FFF9E6] border border-[#E5C780] rounded-md cursor-pointer hover:shadow-md hover:border-amber-500 transition-all group"
          >
            <div className="bg-amber-500 w-full py-1 text-center text-xs font-medium text-amber-900">
              {pack.label}
            </div>
            <div className="flex items-center justify-center py-5">
              <span className="text-xl font-semibold group-hover:scale-110 transition-transform">
                ₹ {pack.pay.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RechargePackList;