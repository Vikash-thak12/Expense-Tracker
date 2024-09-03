// utils/formatUserName.ts

import type { UserResource } from '@clerk/types';
import { FaSun, FaMotorcycle, FaMoon } from 'react-icons/fa';


export const formatUserName = (user: UserResource | undefined | null): string => {
    if (!user) return '';

    const firstName = user.firstName
        ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()
        : '';
    const lastName = user.lastName
        ? user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1).toLowerCase()
        : '';

    return `${firstName} ${lastName}`.trim();
};


export const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return {
      message: 'Good Morning',
      icon: FaSun,
    };
  } else if (currentHour < 18) {
    return {
      message: 'Good Afternoon',
      icon: FaMotorcycle,
      // icon: <FaRegClock />
    };
  } else {
    return {
      message: 'Good Evening',
      icon: FaMoon
    };
  }
};

