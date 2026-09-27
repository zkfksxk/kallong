import { Calendar } from '@mantine/dates';
import dayjs from 'dayjs';

type ClosetCalendarProps = {
  locale: string;
  currentDay: Date;
  selectedDay: string;
  outfitDays: Set<string>;
  onChangeMonth: (date: Date) => void;
  onSelectDay: (date: string) => void;
};

export default function ClosetCalendar({
  locale,
  currentDay,
  selectedDay,
  outfitDays,
  onChangeMonth,
  onSelectDay,
}: ClosetCalendarProps) {
  return (
    <Calendar
      locale={locale}
      className='w-full'
      hideOutsideDates
      onPreviousMonth={() =>
        onChangeMonth(dayjs(currentDay).subtract(1, 'month').toDate())
      }
      onNextMonth={() =>
        onChangeMonth(dayjs(currentDay).add(1, 'month').toDate())
      }
      getDayProps={(date) => {
        const dateString = dayjs(date).format('YYYY-MM-DD');
        const isFuture = dayjs(date).isAfter(dayjs(), 'day');
        const isCurrent = dateString === selectedDay;
        const hasOutfit = outfitDays.has(dateString);

        return {
          onClick: () => !isFuture && onSelectDay(dateString),
          disabled: isFuture,
          style: {
            ...(isFuture ? { color: '#ccc', cursor: 'not-allowed' } : {}),
            ...(hasOutfit
              ? {
                  backgroundColor: '#FFC9C8',
                  color: 'black',
                }
              : {}),
            ...(isCurrent
              ? {
                  backgroundColor: '#e3231f',
                  color: 'white',
                }
              : {}),
          },
        };
      }}
      styles={{
        calendarHeader: {
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          placeItems: 'center',
          margin: '0 auto 10px auto',
          color:
            'light-dark(var(--mantine-color-black), var(--mantine-color-white))',
        },
        calendarHeaderControl: {
          width: '40px',
          height: '40px',
        },
        calendarHeaderLevel: {
          width: '100%',
          flex: 1,
          textAlign: 'center',
        },
        levelsGroup: {
          width: '100%',
        },
        yearsList: {
          width: '100%',
          tableLayout: 'fixed' as const,
        },
        yearsListCell: {
          textAlign: 'center',
          verticalAlign: 'middle',
          width: '100%',
        },
        yearsListControl: {
          width: '100%',
        },
        monthsList: {
          width: '100%',
          tableLayout: 'fixed' as const,
        },
        monthsListCell: {
          textAlign: 'center',
          verticalAlign: 'middle',
          width: '100%',
        },
        monthsListControl: {
          width: '100%',
        },
        monthCell: {
          width: '100%',
          textAlign: 'center',
        },
        month: {
          width: '100%',
        },
        weekday: {
          fontSize: '14px',
        },
        day: {
          fontSize: '14px',
          margin: '4px',
        },
      }}
    />
  );
}
