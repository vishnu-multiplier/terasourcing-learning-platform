import React, { useState } from 'react';

const BatchesPage = () => {
  const [filter, setFilter] = useState('Upcoming');
  const [showForm, setShowForm] = useState(false);
  const [richDescription, setRichDescription] = useState('');
  const filters = ['All', 'Upcoming', 'Archived', 'Unpublished'];

  const [formData, setFormData] = useState({
    title: '',
    instructors: '',
    published: false,
    allowSelfEnrollment: false,
    certification: false,
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    timezone: '',
    seatCount: '',
    evaluationEndDate: '',
    medium: '',
    category: '',
    paidBatch: false,
    amount: '',
    currency: '',
    shortDescription: '',
    batchDetails: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const batchData = { ...formData, batchDetails: richDescription };
    console.log('Submitted batch:', batchData);
    alert('Batch submitted!');
    setShowForm(false);
  };

  return (
    <div className="p-6 font-sans">
      {/* Page Title and +New Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Batches</h2>
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg border-none cursor-pointer text-base font-medium shadow flex items-center gap-1.5 hover:bg-blue-700 transition"
          onClick={() => setShowForm(true)}
        >
          <span className="text-xl">+</span> New
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg border text-sm font-${filter === f ? 'semibold' : 'normal'} cursor-pointer transition ${filter === f ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'}`}
          >
            {f}
          </button>
        ))}

        <label className="flex items-center gap-1.5 ml-auto text-sm">
          <input type="checkbox" className="accent-blue-600" />
          Certification
        </label>

        <input
          type="text"
          placeholder="Search by Title"
          className="px-3 py-2 rounded-lg border border-gray-300 min-w-[180px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />

        <select className="px-3 py-2 rounded-lg border border-gray-300 min-w-[140px] text-sm focus:outline-none">
          <option>Category</option>
        </select>
      </div>

      {/* Batch Form Section */}
      {showForm ? (
        <form onSubmit={handleSubmit} className="border border-gray-200 p-6 rounded-lg bg-white">
          <h3 className="text-xl font-semibold mb-4">New Batch</h3>

          {/* Upload Media Section */}
          <div className="mb-4">
            <label className="font-medium mb-2 block">Upload Media</label>
            <input
              type="file"
              accept="image/*,video/*"
              className="mt-2"
              // onChange={handleMediaUpload} // Optional: handle file upload logic
            />
            <small className="text-gray-400">Supported: images, videos</small>
          </div>

          {/* Title & Instructor */}
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title *"
            className="w-full px-3 py-2 mb-3 rounded-md border border-gray-300 text-sm" required />
          <input name="instructors" value={formData.instructors} onChange={handleChange} placeholder="Instructors *"
            className="w-full px-3 py-2 mb-3 rounded-md border border-gray-300 text-sm" required />

          {/* Checkboxes */}
          <div className="flex gap-5 mb-3">
            <label className="flex items-center gap-1.5"><input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="accent-blue-600" /> Published</label>
            <label className="flex items-center gap-1.5"><input type="checkbox" name="allowSelfEnrollment" checked={formData.allowSelfEnrollment} onChange={handleChange} className="accent-blue-600" /> Allow self enrollment</label>
            <label className="flex items-center gap-1.5"><input type="checkbox" name="certification" checked={formData.certification} onChange={handleChange} className="accent-blue-600" /> Certification</label>
          </div>

          {/* Dates & Times */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm" required />
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm" required />
            <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm" required />
            <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm" required />
            <input name="timezone" value={formData.timezone} onChange={handleChange} placeholder="Timezone * (e.g., IST +5:30)" className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm" required />
          </div>

          {/* Additional Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            <input name="seatCount" value={formData.seatCount} onChange={handleChange} placeholder="Seat Count" className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm" />
            <input type="date" name="evaluationEndDate" value={formData.evaluationEndDate} onChange={handleChange} className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm" />
            <input name="medium" value={formData.medium} onChange={handleChange} placeholder="Medium" className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm" />
            <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm" />
          </div>

          {/* Payment Options */}
          <div className="mt-3">
            <label className="flex items-center gap-1.5"><input type="checkbox" name="paidBatch" checked={formData.paidBatch} onChange={handleChange} className="accent-blue-600" /> Paid Batch</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm" />
              <input name="currency" value={formData.currency} onChange={handleChange} placeholder="Currency" className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm" />
            </div>
          </div>

          {/* Description */}
          <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange}
            placeholder="Short Description *" className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm mb-3 min-h-[60px]" required />
          <label className="font-medium mb-2 block">Batch Details *</label>
          {/* You can add a rich text editor here if needed */}
          <textarea
            name="batchDetails"
            value={richDescription}
            onChange={e => setRichDescription(e.target.value)}
            placeholder="Enter batch details..."
            className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm mb-4 min-h-[120px]"
            required
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-md font-medium hover:bg-gray-300 transition">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition">Save</button>
          </div>
        </form>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <div className="text-5xl mb-4">📖</div>
          <h3 className="text-lg font-semibold mb-2">No batches found</h3>
          <p>There are no batches matching the criteria. Keep an eye out, fresh learning experiences are on the way soon!</p>
        </div>
      )}
    </div>
  );
};

export default BatchesPage;