import React from 'react'

function OutputBox({ career, skills, roadmap }) {
  return (
    <div className="mt-6 text-left bg-white p-6 border border-blue-100 rounded-lg shadow-md w-full">
      <h3 className="text-2xl font-bold text-blue-700 mb-2">{career}</h3>
      <p className="mb-2">
        <strong>Skills to Learn:</strong> {skills.join(', ')}
      </p>
      <p>
        <strong>Roadmap:</strong> {roadmap}
      </p>
    </div>
  )
}

export default OutputBox
