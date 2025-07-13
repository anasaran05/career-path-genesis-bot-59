import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Crown, Zap } from "lucide-react";
interface PremiumModalProps {
  open: boolean;
  onClose: () => void;
}
const PremiumModal: React.FC<PremiumModalProps> = ({
  open,
  onClose
}) => {
  return <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-900 via-fuchsia-900 border-white/10 text-white bg-red-950">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Crown className="w-6 h-6 text-yellow-400" />
            Auto-Apply Premium
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-white/70 mb-4">Let us apply to jobs for you using our advanced system</p>
            <div className="bg-white/5 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">60% Human Review (quality check, tailoring)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-sm">40% AI Automation (error-free, fast)</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">100 Job Applications</span>
                  <span className="text-2xl font-bold text-green-400">$20</span>
                </div>
                <ul className="text-sm text-white/70 space-y-1">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    ATS-friendly applications
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Relevant job matching
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Progress tracking
                  </li>
                </ul>
                <Button className="w-full mt-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                  Get Started - $20
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-yellow-500/30 hover:bg-white/10 transition-colors relative">
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                POPULAR
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">200 Job Applications</span>
                  <span className="text-2xl font-bold text-yellow-400">$35</span>
                </div>
                <ul className="text-sm text-white/70 space-y-1">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Everything in 100 plan
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Priority processing
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-400" />
                    Weekly progress reports
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    Better value ($0.175 per application)
                  </li>
                </ul>
                <Button className="w-full mt-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                  Best Value - $35
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center text-sm text-white/60">
            <p>🔒 Secure payment • Cancel anytime • 30-day money-back guarantee</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default PremiumModal;