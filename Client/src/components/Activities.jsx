/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { MdOutlineMessage, MdOutlineDoneAll } from 'react-icons/md';
import { FaThumbsUp, FaUser, FaBug } from 'react-icons/fa';
import { GrInProgress } from 'react-icons/gr';

const TASKTYPEICON = {
  commented: (
    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-yellow-100">
      <MdOutlineMessage size={24} />
    </div>
  ),
  started: (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-yellow-100">
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white">
      <FaUser size={16} />
    </div>
  ),
  bug: (
    <div className="w-10 h-10 flex items-center justify-center rounded-full text-red-600">
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white">
      <GrInProgress size={16} />
    </div>
  ),
};

import api from '../utils/api';

const Activities = ({ activity = [], id }) => {
  const [text, setText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [comments, setComments] = useState(activity);

  // Refetch activities/comments after new comment
  const fetchActivities = async () => {
    try {
      const res = await api.get(`/task/${id}`);
      setComments(res.data.activities || []);
    } catch (e) {}
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setCommentLoading(true);
    try {
      await api.post(`/task/${id}/comment`, { comment: text });
      setText("");
      await fetchActivities();
    } catch (err) {
      // Optionally show error
    } finally {
      setCommentLoading(false);
    }
  };

  return (
    <div className='w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto'>
      <div className='w-full md:w-1/2'>
        <h4 className='text-gray-600 font-semibold text-lg mb-5'>Activities</h4>
        <div className="w-full space-y-4">
          {comments && comments.length > 0 ? (
            comments.map((el, index) => (
              <Card key={index} item={el} isLast={index === comments.length - 1} />
            ))
          ) : (
            <span className="text-gray-400">No activities yet.</span>
          )}
        </div>
        {/* Comment Section */}
        <form onSubmit={handleComment} className="mt-8 flex gap-2 items-center">
          <input
            type="text"
            className="flex-1 border border-gray-300  text-gray-800 rounded px-3 py-2 focus:outline-none"
            placeholder="Add a comment..."
            value={text}
            onChange={e => setText(e.target.value)}
            disabled={commentLoading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={commentLoading || !text.trim()}
          >
            {commentLoading ? 'Posting...' : 'Comment'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Improved Card component for activity timeline
const Card = ({ item, isLast }) => (
  <div className="flex space-x-4">
    {/* Timeline Icon and Line */}
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="w-10 h-10 flex items-center justify-center">
        {TASKTYPEICON[item?.type] || TASKTYPEICON.commented}
      </div>
      {/* Vertical line except for last item */}
      {!isLast && (
        <div className="w-0.5 bg-gray-600 h-full my-1" style={{ minHeight: 32 }} />
      )}
    </div>
    {/* Activity Content */}
    <div className="flex flex-col gap-y-1 mb-8">
      <div className="font-semibold text-gray-800">{item.activity}</div>
      <div className="text-xs text-gray-500">{item.date ? new Date(item.date).toLocaleString() : "No date"}</div>
      <div className="text-xs text-blue-600">By: {item.by?.name || item.by || "Unknown"}</div>
    </div>
  </div>
);

export default Activities;
