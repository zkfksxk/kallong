export const timeCalc = (createdAt: string) => {
  const created = new Date(createdAt);
  const now = new Date();

  // 경과 시간(ms)
  const diffMs = now.getTime() - created.getTime();

  // 기준 시간 (12시간)
  const totalAllowedMs = 12 * 60 * 60 * 1000;
  const remainingMs = Math.max(totalAllowedMs - diffMs, 0); // 0 이하로는 내려가지 않게

  const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
  const remainingMinutes = Math.floor(
    (remainingMs % (1000 * 60 * 60)) / (1000 * 60)
  );

  const pad = (num: number) => String(num).padStart(2, '0');

  // HH:MM 형태로 반환
  return `${pad(remainingHours)}:${pad(remainingMinutes)}`;
};

export function getDaysSince(createdAt: string): number {
  const created = new Date(createdAt);
  const today = new Date();

  // 시간 차이를 일로 변환
  const diffTime = today.getTime() - created.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
