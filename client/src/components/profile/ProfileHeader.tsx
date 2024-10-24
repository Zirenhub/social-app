import React, { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import ProfilePicture from './ProfilePicture';
import useProfileAction from '../../hooks/useProfileAction';
import BackButton from '../common/BackButton';
import ProfileTitle from '../common/ProfileTitle';
import { TProfileApi } from 'shared';
import { format } from 'date-fns';

type Props = {
  profile: TProfileApi;
  isMyProfile: boolean;
  scrollRef: React.RefObject<HTMLDivElement>;
};

const ProfileHeader = ({ scrollRef, profile, isMyProfile }: Props) => {
  const { renderActionButton } = useProfileAction({ profile, isMyProfile });

  const { scrollY } = useScroll({ container: scrollRef });
  const fullHeaderRef = useRef<HTMLDivElement>(null);
  const compactHeaderRef = useRef<HTMLDivElement>(null);

  const headerHeight = 230;

  const fullHeaderOpacity = useTransform(scrollY, [0, headerHeight], [1, 0]);
  const compactHeaderOpacity = useTransform(scrollY, [0, headerHeight], [0, 1]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (fullHeaderRef.current && compactHeaderRef.current) {
      // Toggle visibility based on scroll position
      if (latest < headerHeight) {
        fullHeaderRef.current.style.visibility = 'visible';
        compactHeaderRef.current.style.visibility = 'hidden';
      } else {
        fullHeaderRef.current.style.visibility = 'hidden';
        compactHeaderRef.current.style.visibility = 'visible';
      }
    }
  });

  useEffect(() => {
    // initial values for visibility
    if (fullHeaderRef.current && compactHeaderRef.current) {
      fullHeaderRef.current.style.visibility = 'visible';
      compactHeaderRef.current.style.visibility = 'hidden';
    }
  }, []);

  return (
    <>
      {/* Full Header */}
      <motion.div
        className={`bg-green-400 rounded-t-md h-[${headerHeight}px] z-10 mb-4`}
        ref={fullHeaderRef}
        style={{
          opacity: fullHeaderOpacity,
        }}
      >
        <BackButton className="bg-primary ml-4 mt-4" />
        <div className="flex justify-between h-full items-end translate-y-14">
          <div className="flex items-end pl-6">
            <ProfilePicture styles="w-36 h-36 shadow-lg" />
            <div className="ml-2">
              <p className="text-2xl font-bold text-fourth">
                {profile.firstName} {profile.lastName}
              </p>
              <p className="text-secondary/70">@{profile.username}</p>
            </div>
          </div>
          <div className="flex flex-col -translate-y-2 pr-6">
            {renderActionButton()}
            <p className="text-xs text-secondary/70 whitespace-nowrap">
              Joined {format(new Date(profile.createdAt), 'MMMM yyyy')}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Compact Header */}
      <motion.div
        className="bg-white/95 backdrop-blur-sm w-full flex gap-3 py-2 items-center shadow-sm sticky top-0 left-0"
        ref={compactHeaderRef}
        style={{
          opacity: compactHeaderOpacity,
        }}
      >
        <BackButton className="bg-primary ml-4" />
        <ProfileTitle
          identifiers={{
            firstName: profile.firstName,
            lastName: profile.lastName,
            username: profile.username,
          }}
        />
      </motion.div>
    </>
  );
};

export default ProfileHeader;
