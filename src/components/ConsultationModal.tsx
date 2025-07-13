
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar as CalendarIcon, User, CheckCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'date' | 'time' | 'confirm'>('date');

  const availableSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setStep('time');
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep('confirm');
  };

  const handleConfirm = () => {
    toast("Consultation scheduled successfully! You'll receive a confirmation email shortly.", {
      icon: <CheckCircle className="w-4 h-4 text-green-500" />
    });
    onClose();
    // Reset state
    setSelectedDate(undefined);
    setSelectedTime(null);
    setStep('date');
  };

  const handleBack = () => {
    if (step === 'time') {
      setStep('date');
    } else if (step === 'confirm') {
      setStep('time');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl text-navy-800">
            <User className="w-6 h-6 mr-2 text-autumn-500" />
            Schedule Free Consultation
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Book a personalized career consultation with our healthcare career experts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {step === 'date' && (
            <div className="text-center">
              <h3 className="text-lg font-semibold text-navy-800 mb-4 flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-autumn-500" />
                Select a Date
              </h3>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  className="rounded-md border border-slate-200 pointer-events-auto"
                />
              </div>
              <p className="text-sm text-slate-500 mt-2">Available Monday - Friday</p>
            </div>
          )}

          {step === 'time' && selectedDate && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-navy-800 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-autumn-500" />
                  Select Time Slot
                </h3>
                <Button variant="outline" onClick={handleBack} size="sm">
                  Back to Date
                </Button>
              </div>
              
              <div className="mb-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableSlots.map((time) => (
                  <Button
                    key={time}
                    variant="outline"
                    onClick={() => handleTimeSelect(time)}
                    className="border-2 border-slate-200 hover:border-autumn-500 hover:bg-autumn-50 text-navy-700"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 'confirm' && selectedDate && selectedTime && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-navy-800">Confirm Booking</h3>
                <Button variant="outline" onClick={handleBack} size="sm">
                  Back to Time
                </Button>
              </div>

              <Card className="bg-gradient-to-r from-navy-50 to-autumn-50 border-navy-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 text-autumn-600 mr-3" />
                      <div>
                        <p className="font-medium text-navy-800">
                          {selectedDate.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        <p className="text-slate-600 text-sm">Selected Date</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-autumn-600 mr-3" />
                      <div>
                        <p className="font-medium text-navy-800">{selectedTime}</p>
                        <p className="text-slate-600 text-sm">Duration: 30 minutes</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <User className="w-5 h-5 text-autumn-600 mr-3" />
                      <div>
                        <p className="font-medium text-navy-800">Healthcare Career Expert</p>
                        <p className="text-slate-600 text-sm">Personalized consultation</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3 mt-6">
                <Button 
                  onClick={handleConfirm}
                  className="flex-1 bg-gradient-to-r from-navy-600 to-autumn-500 hover:from-navy-700 hover:to-autumn-600 text-white"
                >
                  Confirm Booking
                </Button>
                <Button variant="outline" onClick={onClose} className="px-6">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationModal;
