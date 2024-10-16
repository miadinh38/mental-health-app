"use client";

import { useState } from "react";

const Guideline = ({ isChecked, onCheckboxChange }) => {
  return (
    <div className="p-4">
      <h2 className="bold-20 mb-2">Community Guidelines</h2>
      <p className="text-sm mb-4">
        Please read and agree to the following community guidelines:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Be respectful to others.</li>
        <li>No hate speech or bullying.</li>
        <li>Keep conversations relevant.</li>
        <li>Report any inappropriate content.</li>
      </ul>
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onCheckboxChange}
          className="mr-2"
        />
        <span className="text-sm">I agree to the community guidelines.</span>
      </label>
    </div>
  );
};

export default Guideline;
