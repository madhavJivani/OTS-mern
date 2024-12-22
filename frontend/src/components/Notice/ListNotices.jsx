import React, { useEffect, useState } from 'react';
import { get_notices } from '../../utils/notice.index.js'; // Adjust path as needed
import { FaCalendarAlt } from 'react-icons/fa';

function formatDate(isoString) {
    const date = new Date(isoString);
    const options = {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };
    return date.toLocaleDateString('en-GB', options);
}

const ListNotices = () => {
    const [notices, setNotices] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await get_notices();
                if (res && res.success && res.notices) { // Check if res and res.notices exist
                    setNotices(res.notices);
                } else {
                    setError('Failed to load notices.');
                }
            } catch (err) {
                setError('An error occurred while fetching notices.');
                console.error("Error fetching notices:", err); // More informative error logging
            } finally {
                setLoading(false); // Set loading to false regardless of success/failure
            }
        };

        fetchNotices();
    }, []);

    if (loading) {
        return <div className="text-center mt-8">Loading notices...</div>; // Loading indicator
    }

    return (
        <div className="bg-[#101218] text-[#fafafa] min-h-screen my-8">
            <section className="py-12">
                <h2 className="text-3xl text-center text-[#6588cb] mb-6">All Notices</h2>
                {error && (
                    <div className="bg-red-500 text-white p-4 rounded-md mb-6 text-center">
                        {error}
                    </div>
                )}
                {notices.length === 0 && !error ? ( // Check for both no notices and no error
                    <p className="text-center text-lg text-[#b0b5c1]">No notices available at the moment.</p>
                ) : (
                    <div className="flex flex-col items-center gap-6 px-4 md:px-12">
                        {notices.map((notice) => (
                            <div key={notice._id} className="flex flex-col lg:flex-row items-center justify-between mb-6 bg-[#3c4352] p-6 rounded-md w-full lg:w-3/4">
                                {/* Left side: Image */}
                                <div className="w-full lg:w-1/4 flex flex-col items-center mb-4 lg:mb-0">
                                    <img
                                        src="https://res.cloudinary.com/madhav-daiict/image/upload/v1734681924/rcdmth9309na2zivs0i9.png"
                                        alt="Notice"
                                        className="w-20 h-20 object-cover rounded-md mb-2"
                                    />
                                    <p className="text-[#b0b5c1] text-center">{notice.author}</p>
                                </div>

                                {/* Vertical line (Border) */}
                                <div className="border-l-2 border-[#b0b5c1] mx-4 h-full lg:h-auto mb-4 lg:mb-0"></div>

                                {/* Right side: Text (Title, Description, Dates) */}
                                <div className="w-full lg:w-3/4 flex flex-col justify-between">
                                    <h3 className="text-xl font-semibold text-center lg:text-left">{notice.title}</h3>
                                    <p className="mt-2 text-[#b0b5c1] text-center lg:text-left">{notice.short_description}</p>

                                    <div className="flex flex-col lg:flex-row justify-between mt-4">
                                        <div className="flex items-center mb-2 lg:mb-0">
                                            <span className="text-[#b0b5c1] mr-1">Posted on:</span>
                                            <div className="flex items-center justify-start">
                                                <FaCalendarAlt className="text-[#b0b5c1] mr-2" />
                                                <span>{formatDate(notice.createdAt)}</span>
                                            </div>
                                        </div>
                                        {notice.updatedAt && ( // Conditionally render "Last Updated" if updatedAt exists
                                            <div className="flex items-center">
                                                <span className="text-[#b0b5c1] mr-1">Last Updated:</span>
                                                <div className='flex items-center justify-start'>
                                                    <FaCalendarAlt className="text-[#b0b5c1] mr-2" />
                                                    <span>{formatDate(notice.updatedAt)}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default ListNotices;
