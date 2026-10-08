import React from 'react'

function ParentInquiryForm() {
  return (
    <div>
         <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"
            >
              <h3 className="text-2xl font-black">Parent enquiry</h3>
              <p className="mt-2 text-sm text-slate-500">
                {`Tell us a little about your child and we'll help you choose a
                starting point.`}
              </p>
              <div className="mt-6 space-y-4">
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-[#4f7cff]"
                  placeholder="Parent's name"
                />
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-[#4f7cff]"
                  placeholder="WhatsApp / phone number"
                />
                <input
                  className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-[#4f7cff]"
                  placeholder="Child's age"
                />
                <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none focus:border-[#4f7cff]">
                  <option>Scratch Foundation</option>
                  <option>Python</option>
                  <option>Software & AI Engineering</option>
                  <option>Not sure — I need guidance</option>
                </select>
                <button className="w-full rounded-xl bg-[#07152f] px-5 py-4 font-black text-white">
                  Request Free Trial
                </button>
              </div>
            </form>
    </div>
  )
}

export default ParentInquiryForm