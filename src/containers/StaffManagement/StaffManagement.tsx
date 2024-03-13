'use client';

import { activateUserAccount, deleteAUser, getAllUsers } from '@/apis/user';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AlertDialogCustom } from '@/components/AlertDialogCustom';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
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
  const dispatch = useAppDispatch();

  const allStaff = useAppSelector((state) => state.userStore.users);

  const [filteredStaff, setFilteredStaff] = useState<UserType[]>(allStaff);

  // set filtered Staff when all staff updated
  useEffect(() => {
    setFilteredStaff(allStaff);
  }, [allStaff]);

  useEffect(() => {
    getAllUsers(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        QUẢN LÝ NHÂN VIÊN
      </p>

      {allStaff.length > 0 ? (
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
                        onValueChange={(value) =>
                          activateUserAccount(
                            { id: user.id, userStatus: value },
                            dispatch
                          )
                        }
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
                          onSubmit={() => deleteAUser(user.id, dispatch)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className='text-red-500 text-xl text-center'>
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
      )}
    </>
  );
};

export default StaffManagement;
