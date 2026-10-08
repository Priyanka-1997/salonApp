import { CommonActions } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import OtpVerificationView from '../../../components/auth/OtpVerificationView';
import { getSalonDetails } from '../../../data/salonDetails';
import { useAppData } from '../../../hooks/useAppData';
import { useAuth } from '../../../hooks/useAuth';
import type { RootStackParamList } from '../../../navigation/AppNavigator';
import { resolveBookingServices } from '../../../utils/bookingServices';
import { formatIndianMobile } from '../../../utils/phone';

type Props = NativeStackScreenProps<RootStackParamList, 'CustomerOtp'>;

export default function CustomerOtpScreen({ route, navigation }: Props) {
  const { login } = useAuth();
  const { addBooking } = useAppData();
  const { phone, salonId, slotLabel, dateIso, serviceIds = [] } = route.params;

  const onVerify = (otp: string) => {
    if (!login(formatIndianMobile(phone), otp, '', 'customer')) {
      return false;
    }

    if (salonId && slotLabel && dateIso) {
      const salon = getSalonDetails(salonId);
      const { amount } = salon ? resolveBookingServices(salon, serviceIds) : { amount: 0 };
      const queueNo = salon ? Math.max(1, salon.queue - 1) : 2;
      const booking = addBooking({ salonId, slotLabel, dateIso, phone, serviceIds, amount, queueNo });
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'BookingConfirmation',
              params: { salonId, slotLabel, dateIso, phone, serviceIds, bookingId: booking.id },
            },
          ],
        }),
      );
      return true;
    }

    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Home' }] }));
    return true;
  };

  return (
    <OtpVerificationView
      phone={phone}
      bookingSlot={slotLabel}
      onBack={() => navigation.goBack()}
      onEditPhone={() => navigation.goBack()}
      onVerify={onVerify}
    />
  );
}