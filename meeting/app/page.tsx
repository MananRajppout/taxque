'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/Home.module.css';
import { toast } from 'react-hot-toast';

const CHARSET = 'abcdefghijklmnopqrstuvwxyz0123456789';

function generateRoomId() {
  const segmentLength = 3;
  const makeSegment = () =>
    Array.from({ length: segmentLength })
      .map(
        () => CHARSET[Math.floor(Math.random() * CHARSET.length)],
      )
      .join('');

  return `${makeSegment()}-${makeSegment()}-${makeSegment()}`;
}

const HomePage = () => {
  const [roomId, setRoomId] = useState('');
  const router = useRouter();

  const handleGenerate = useCallback(() => {
    setRoomId(generateRoomId());
  }, []);

  const handleJoin = useCallback(
    (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      const trimmed = roomId.trim();
      if (!trimmed) {
        toast.error('Please enter or generate a room ID.');
        return;
      }

      router.push(`/rooms/${trimmed}`);
    },
    [roomId, router],
  );

  const handleShare = useCallback(async () => {
    const trimmed = roomId.trim();
    if (!trimmed) {
      toast.error('Generate or enter a room ID first.');
      return;
    }

    const url = `${window.location.origin}/rooms/${trimmed}`;

    try {
      await navigator.clipboard.writeText(url);
      toast.success('Share link copied to clipboard.');
    } catch (err) {
      console.error(err);
      toast.success(`Share this link: ${url}`);
    }
  }, [roomId]);

  const handleJoinAsAdmin = useCallback(() => {
    router.push(`/rooms/${roomId}?isAdmin=true`);
  }, [roomId, router]);

  return (
    <main className={styles.main}>
      <div className={styles.logo}>taxque</div>

      <section className={styles.tabContainer}>
        <div className={styles.tabContent}>
          <h1 className={styles.heading}>Join or create a meeting</h1>
          <p className={styles.subheading}>
            Enter a room ID or generate a new one in the format
            {' '}
            <code>xxx-xxx-xxx</code>
            {' '}
            to start.
          </p>

          <form onSubmit={handleJoin} className={styles.form}>
            <label className={styles.label}>
              Room ID
              <input
                type="text"
                placeholder="abc-def-ghi"
                value={roomId}
                onChange={(e) =>
                  setRoomId(e.target.value.toLowerCase())}
                className={styles.input}
              />
            </label>

            <div className={styles.buttonRow}>
              <button
                type="button"
                onClick={handleGenerate}
                className={styles.secondaryButton}
              >
                Generate ID
              </button>
              <button
                type="button"
                onClick={handleShare}
                className={styles.secondaryButton}
              >
                Share link
              </button>
              <button
                type="submit"
                className={styles.primaryButton}
              >
                Join room
              </button>
              <button
                type="button"
                onClick={handleJoinAsAdmin}
                className={styles.primaryButton}
              >
                Join as admin
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default HomePage;