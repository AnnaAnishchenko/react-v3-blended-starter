'use client';

import Link from 'next/link';
import css from './SidebarPosts.module.css';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/lib/api';
import { User } from '@/types/user';

const Sidebar = () => {
  const { data: users } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href={`/posts/filter/All`} className={css.menuLink}>
          All users
        </Link>
      </li>
      {users?.map((user) => (
        <li key={user.id} className={css.menuItem}>
          <Link href={`/posts/filter/${user.id}`} className={css.menuLink}>
            {user.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
