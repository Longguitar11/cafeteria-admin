'use client';

import { activateUserAccount, getAllUsers } from '@/apis/user';
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
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const UsersManagement = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.userStore.users);

  console.log({ users });

  useEffect(() => {
    getAllUsers(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        QUẢN LÝ NHÂN VIÊN
      </p>

      {users.length > 0 ? (
        <div className='mt-4'>
          <Table>
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
              {users.map((user, index) => (
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
                        onSubmit={() => {}}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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

export default UsersManagement;
