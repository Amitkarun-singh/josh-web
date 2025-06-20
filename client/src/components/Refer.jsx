import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGift } from 'react-icons/fa';
import { Copy, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useSelector } from 'react-redux';

const Refer = () => {
  const user = useSelector((state) => state.user);
  const [incomeHistory, setIncomeHistory] = useState([]);
  const [copy, setCopy] = useState(false);

  const referralHeader = `https://joshguru.com/signup?referralCode=`;
  const referralLink = `${referralHeader}${user?.sharableReferralCode}`;

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000);
  };

  useEffect(() => {
    if (user?.incomeHistory && Array.isArray(user?.incomeHistory)) {
      const updatedIncome = user.incomeHistory.map((item) => ({
        id: item._id,
        amount: item.amount,
        person: item.from?.name || 'Unknown',
      }));
      setIncomeHistory(updatedIncome);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-5 sm:p-8 w-full max-w-3xl"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Refer & Earn</h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          Invite your friends and earn rewards when they join!
        </p>

        {/* Mobile View */}
        {user?.canRefer ? (
          <div className="block md:hidden mb-8">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">Your Referral Code</h2>
            <div className="flex flex-col items-start bg-gray-100 p-4 rounded-xl border border-gray-200 space-y-3">
              <span className="text-lg font-medium text-gray-800 break-words">{referralLink}</span>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md">
                    <Share2 size={18} />
                    <span>Share</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95%] sm:max-w-md p-4 sm:p-6 mx-auto">
                  <DialogHeader>
                    <DialogTitle>Share your referral link</DialogTitle>
                    <DialogDescription>
                      Send this code to your friends and earn rewards when they sign up.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4">
                    <div className="flex-1 flex items-center gap-2">
                      <Label htmlFor="link" className="sr-only">
                        Referral Link
                      </Label>
                      <Input id="link" defaultValue={referralLink} readOnly className="w-full" />
                      <Button
                        type="button"
                        size="sm"
                        className="px-3 sm:w-auto"
                        onClick={handleCopyReferralLink}
                      >
                        {copy ? <span className="text-gray-50">Copied!</span> : <Copy size={16} />}
                      </Button>
                    </div>
                  </div>
                  <DialogFooter className="justify-start sm:justify-end mt-4">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="secondary"
                        className="bg-gray-300 text-gray-700 hover:bg-gray-400"
                      >
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : (
          <div className="block md:hidden mb-8">
            <p>You need to buy a Trending Course or Bundle to Refer</p>
          </div>
        )}

        {/* Desktop View */}
        {user?.canRefer ? (
          <div className="hidden md:block mb-8">
            <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">Your Referral Link</h2>
            <div className="flex flex-row items-center justify-between bg-gray-100 p-4 rounded-xl border border-gray-200">
              <span className="text-lg font-medium text-gray-800 break-words">{referralLink}</span>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md">
                    <Share2 size={18} />
                    <span>Share</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95%] sm:max-w-md p-4 sm:p-6 mx-auto">
                  <DialogHeader>
                    <DialogTitle>Share your referral link</DialogTitle>
                    <DialogDescription>
                      Send this code to your friends and earn rewards when they sign up.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-4">
                    <div className="flex-1 flex items-center gap-2">
                      <Label htmlFor="link" className="sr-only">
                        Referral Link
                      </Label>
                      <Input id="link" defaultValue={referralLink} readOnly className="w-full" />
                      <Button
                        type="button"
                        size="sm"
                        className="px-3 sm:w-auto"
                        onClick={handleCopyReferralLink}
                      >
                        {copy ? <span className="text-gray-50">Copied!</span> : <Copy size={16} />}
                      </Button>
                    </div>
                  </div>
                  <DialogFooter className="justify-start sm:justify-end mt-4">
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="secondary"
                        className="bg-gray-300 text-gray-700 hover:bg-gray-400"
                      >
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ) : (
          <div className="hidden md:block mb-8">
            <p>You need to buy a Trending Course or Bundle to Refer</p>
          </div>
        )}

        {/* Rewards Section */}
        <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">Your Rewards</h2>
        <ul className="space-y-3">
          {incomeHistory.length === 0 ? (
            <li className="text-gray-500 text-sm italic">No rewards yet. Start referring!</li>
          ) : (
            incomeHistory.map((reward, index) => (
              <motion.li
                key={reward.id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex justify-between items-center bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 text-sm sm:text-base text-gray-700">
                  <FaGift className="text-orange-500 text-lg" />
                  <span className="truncate">{reward?.person} joined</span>
                </div>
                <span className="text-green-600 font-bold text-sm sm:text-base whitespace-nowrap">
                  ₹{parseFloat(reward?.amount).toFixed(2)}
                </span>
              </motion.li>
            ))
          )}
        </ul>
      </motion.div>
    </div>
  );
};

export default Refer;
