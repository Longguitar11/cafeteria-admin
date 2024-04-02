'use client';

import { activateUserAccount, deleteAUser, getAllUsers } from '@/apis/user';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AlertDialogCustom } from '@/components/AlertDialogCustom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserType } from '@/types/user';
import { Props } from './StaffManagement.models';
import { StaffFilter } from '@/components/Filter';

const StaffManagement = (props: Props) => {
  const { className } = props;

  const [allStaff, setAllStaff] = useState<UserType[]>([]);
  const [isGettingStaff, setIsGettingStaff] = useState<boolean>(false);
  const [filteredStaff, setFilteredStaff] = useState<UserType[]>(allStaff);

  // useCallback
  const fetchStaff = useCallback(() => {
    const res = getAllUsers();

    setIsGettingStaff(true);
    res
      .then((res) => {
        setIsGettingStaff(false);
        setAllStaff(res);
      })
      .catch((error) => console.log(error));
  }, []);

  // set filtered Staff when all staff updated
  useEffect(() => {
    setFilteredStaff(allStaff);
  }, [allStaff]);

  useEffect(() => {
    fetchStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className}>
      <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        QUẢN LÝ NHÂN VIÊN
      </p>

      {!isGettingStaff ? (
        !isGettingStaff && allStaff.length > 0 ? (
          <div className='mt-4'>
            <StaffFilter
              allStaff={allStaff}
              staff={filteredStaff}
              setStaff={setFilteredStaff}
            />

            <Table className='mt-4'>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>SĐT</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell className='font-medium'>{index + 1}</TableCell>

                      <TableCell>{user.name}</TableCell>

                      <TableCell>{user.email}</TableCell>

                      <TableCell>{user.contactNumber}</TableCell>
                      <TableCell>
                        <Select
                          value={user.status}
                          onValueChange={async (value) => {
                            await activateUserAccount({
                              id: user.id,
                              userStatus: value,
                            });
                            fetchStaff();
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='true'>Đã duyệt</SelectItem>
                            <SelectItem value='false'>Chưa duyệt</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>

                      <TableCell>
                        <div className='flex justify-center gap-3'>
                          <AlertDialogCustom
                            buttonTitle='Xóa'
                            onSubmit={async () => {
                              await deleteAUser(user.id);
                              fetchStaff();
                            }}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className='text-red-500 text-xl text-center'
                    >
                      Không tìm ra nhân viên!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-red-500 font-medium'>
            Chưa có người dùng!
          </p>
        )
      ) : (
        <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-sky-500 font-medium'>
          Đang tải...
        </p>
      )}
    </div>
  );
};

export default StaffManagement;
