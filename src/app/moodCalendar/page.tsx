'use client';
import { useEffect, useState } from 'react';
// import { Content } from './types';
import { Content } from '@/domain/models';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import createClient from '@/repositories/supabase/client';
import { groupContentsByMood } from '@/domain/utils/contentUtils';

export default function MoodCalendar() {
    const [selected, setSelected] = useState<Date>();
    const [contents, setContents] = useState<Content[]>();
    const [isLoading, setIsLoading] = useState(true);
    const handleDayClick = (day: Date | undefined) => {
        setSelected(day);
        console.log('Selected date:', day);
    };

    useEffect(() => {
        const fetchContents = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.from('contents').select('*');

            if (error) {
                console.error('fetch content error in mood calendar:', error);
            }

            if (data) {
                setContents(data);
            }
        };
        fetchContents();
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="p-6">
                <p>캘린더의 정보를 가져오고 있어요...</p>
            </div>
        );
    }

    const contentByMood = groupContentsByMood(contents || []);
    console.log(contentByMood);
    /**
     * 기분에 따라 구분해야한다.
     * 아래의 형태로 데이터를 만들어야 한다.
     *
     * ex)
     *
     * {
     *      angry: [
     *          {
     *              created_at,
     *              content,
     *          }, ...
     *      ],
     *      happy: [
     *              {
     *                  created_at,
     *                  content
     *              }
     *      ]
     *
     *
     * }
     * */

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">기분 캘린더</h2>

            <div className="bg-base-200 text-base-content p-6 rounded-lg shadow-lg">
                <div className="bg-base-100 rounded-lg p-4">
                    {/* <DayPicker
                        // defaultMonth={journalDates[0]}
                        modifiers={{
                            diary: journalDates,
                        }}
                        modifiersClassNames={{
                            diary: 'bg-yellow-100 text-yellow-800',
                        }}
                    /> */}

                    <DayPicker
                        mode="single"
                        onSelect={handleDayClick}
                        selected={selected}
                        className="mx-auto"
                        classNames={{
                            today: 'bg-primary text-primary-content rounded-full font-bold',
                            selected: 'bg-accent text-accent-content rounded-full font-bold',
                            day: 'hover:bg-base-200 rounded-full transition-colors cursor-pointer p-2 m-1 text-center',
                            day_outside: 'text-gray-400',
                            day_disabled: 'text-gray-300 cursor-not-allowed',
                            month: 'space-y-4',
                            caption:
                                'flex justify-center items-center py-2 font-bold text-lg text-base-content',
                            caption_label: 'text-xl',
                            nav: 'space-x-1',
                            nav_button: 'btn btn-sm btn-outline hover:btn-primary',
                            nav_button_previous: 'absolute left-1',
                            nav_button_next: 'absolute right-1',
                            table: 'w-full border-collapse',
                            head_row: 'flex justify-center',
                            head_cell: 'text-sm font-medium text-gray-500 p-2 text-center w-10',
                            row: 'flex justify-center',
                            cell: 'text-center relative p-0 text-sm focus-within:relative focus-within:z-20',
                        }}
                        modifiers={{
                            happy: contentByMood.happy?.map((item) => new Date(item.created_at)),
                            sad: contentByMood.sad?.map((item) => new Date(item.created_at)),
                            angry: contentByMood.angry?.map((item) => new Date(item.created_at)),
                            tired: contentByMood.tired?.map((item) => new Date(item.created_at)),
                            relaxed: contentByMood.relaxed?.map(
                                (item) => new Date(item.created_at),
                            ),
                        }}
                        modifiersClassNames={{
                            selected: 'bg-primary text-primary-content',
                            today: 'bg-accent text-accent-content',
                            goodDay: 'bg-gray-200 rounded-4xl',
                            happy: 'bg-red-100 text-warning-content text-primary-content',
                            sad: 'bg-secondary text-secondary-content',
                            angry: 'bg-error text-error-content',
                            tired: 'bg-warning text-warning-content',
                            relaxed: 'bg-success text-success-content',
                        }}
                    />
                </div>

                {selected && (
                    <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                        <p className="text-sm font-medium">선택된 날짜:</p>
                        <p className="text-lg font-bold">
                            {selected.toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                weekday: 'long',
                            })}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
