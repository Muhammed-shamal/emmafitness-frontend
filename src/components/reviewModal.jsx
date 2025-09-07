import { Modal, Rate, Input, Button, message } from 'antd';
import { useState } from 'react';
import { StarFilled, StarOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';

const ReviewModal = ({ visible, onCancel, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const submitReview = async () => {
    setIsSubmitting(true);
    if (rating === 0) {
      message.warning('Please select a rating before submitting');
      return;
    }else if(comment === '' || comment === null){
        message.warning('Please select a rating before submitting');
        return
    }
    try {
      await onSubmit({ rating, comment });
      message.success('Thank you for your review!');
      setRating(0);
      setComment('');
      onCancel();
    } catch (error) {
      message.error('Failed to submit review. Please try again.');
    }
    setIsSubmitting(false);
  };
  
  const handleCancel = () => {
    setRating(0);
    setComment('');
    onCancel();
  };
  
  return (
    <Modal
      title={null}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      closable={false}
      centered
      width={500}
      className="review-modal"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Share Your Experience</h2>
        <button 
          onClick={handleCancel}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <CloseOutlined className="text-gray-500" />
        </button>
      </div>
      
      {/* Rating Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">How would you rate your experience?</h3>
        <div className="flex justify-center mb-2">
          <Rate
            value={rating}
            onChange={setRating}
            character={({ index }) => {
              return index + 1 <= rating ? (
                <StarFilled className="text-2xl text-yellow-400" />
              ) : (
                <StarOutlined className="text-2xl text-yellow-400" />
              );
            }}
            className="text-3xl"
          />
        </div>
        <div className="text-center text-gray-500 text-sm mt-1">
          {rating === 0 ? 'Select your rating' : `${rating} star${rating > 1 ? 's' : ''}`}
        </div>
      </div>
      
      {/* Comment Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Share more about your experience</h3>
        <Input.TextArea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you like or dislike? What could be improved?"
          className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
          maxLength={500}
        />
        <div className="text-right text-xs text-gray-400 mt-1">
          {comment.length}/500 characters
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button 
          onClick={handleCancel}
          className="px-5 py-2 h-auto rounded-lg border-gray-300 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </Button>
        <Button 
          type="primary" 
          onClick={submitReview}
          icon={<SendOutlined />}
          loading={isSubmitting}
          disabled={rating === 0  || comment.length <= 3 }
          className="px-5 py-2 h-auto rounded-lg bg-blue-500 hover:bg-blue-600 border-transparent"
        >
          Submit Review
        </Button>
      </div>
    </Modal>
  );
};

export default ReviewModal;