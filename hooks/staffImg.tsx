import { useEffect, useState } from 'react';
import { API } from '../constants';
import { StaffQuery } from '../generated/graphql';

export const useStaffImg = (staff: StaffQuery) => {
  const [imgLink, setImgLink] = useState('');

  useEffect(() => {
    if (staff.img) setImgLink(`${API}/images/${staff.img}`);
  }, []);

  return imgLink;
};
