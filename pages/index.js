import Head from "next/head";
import { useState, useEffect } from 'react';
import grayplaceholder from '../assets/gray-400-horizontal.png'
const banana = require('@banana-dev/banana-dev');

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  console.log(prompt)

  useEffect(() => {
    // update image list on page
  },[]);

  const summarize = async (prompt) => {
      const res = await fetch(`/api/summarize`, {
        body: JSON.stringify({
          prompt: prompt
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      const data = await res.json();
      return data.text
  }


  const generateImage = async () => {
    console.log("INITIAL PROMPT:" + prompt)
    summarize(prompt).then(async (summary) => {
      console.log("SUMMARY GENERATED: " + summary)
      const promptModded = "A clear, high quality photo showing that " + summary + ". highly detailed, cinematic lighting, digital art"
      console.log("MODDED PROMPT: " + promptModded)
      const out = await banana.run("48e6f984-4f85-4b8a-a2aa-6ade981c129e", "cee3a79a-7983-4f39-9974-9fce016fc809", {"prompt": promptModded})
      setImage(out.modelOutputs[0].image_base64);
    })
  }

  var renderPicSrc = "https://i.ibb.co/7GcfGgQ/gray-400-horizontal.png"
  if (image != null) {
    renderPicSrc = "data:image/png;base64," + image
  }

  return (
    <div>
      <section class="relative bg-gray-500 overflow-x-hidden"><div class="container px-4 mx-auto">
  <nav class="flex justify-between items-center py-8"><a class="text-white text-2xl leading-none" href="#">
    <img class="h-8" src="mockup-assets/logos/shuffle-ux-light.svg" alt="" width="auto" contenteditable="false"/></a>
    <button class="block navbar-burger text-gray-100 hover:text-gray-200 rounded focus:outline-none">
      <svg class="h-4 w-4" fill="currentColor " viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Mobile menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg></button>
  </nav><div class="mt-16 lg:mb-24 max-w-md">
  <div class="max-w-2xl lg:max-w-md mb-6">
    <h2 class="mb-8 text-4xl md:text-5xl text-white font-bold font-heading" contenteditable="false">A picture is worth a thousand words</h2>
    <p class="text-lg text-gray-200 leading-loose" contenteditable="false">Bring your writing to life with CoolStory</p>
  </div>
  <div class="flex flex-wrap">
    <input class="mb-2 md:mb-0 w-full md:w-2/3 py-3 pl-4 text-sm text-gray-900 rounded" type="text" onChange={(e) => {setPrompt(e.target.value)}} placeholder="Input paragraph"/><button onClick={() => generateImage(prompt)} class="w-full md:w-auto py-3 px-6 md:ml-2 text-sm text-white font-semibold bg-gray-700 hover:bg-gray-800 rounded">Generate!</button>
  </div>
  </div>
  </div>
  <div class="lg:absolute lg:right-0 lg:top-1/2 mt-16 lg:mt-4 lg:-mr-8 lg:transform lg:-translate-y-1/2 w-full lg:w-1/2 px-4 lg:pb-0 pb-16 lg:pb-0">
    <img class="mx-auto lg:mx-0 lg:ml-auto w-full h-80 lg:h-112 object-cover rounded-lg" src={renderPicSrc}></img> </div>
  <div class="hidden navbar-menu fixed top-0 left-0 bottom-0 w-5/6 max-w-sm z-50">
    <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
    <nav class="relative flex flex-col py-6 px-6 w-full h-full bg-white border-r overflow-y-auto"><div class="flex items-center mb-8">
      <a class="mr-auto text-2xl font-semibold leading-none" href="#">
        <img class="h-8" src="mockup-assets/logos/shuffle-ux.svg" alt="" width="auto"/></a>
      <button class="navbar-close">
        <svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
      </div>
      <div>
        <ul><li class="mb-1"><a class="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded" href="#">About</a></li>
          <li class="mb-1"><a class="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded" href="#">Company</a></li>
          <li class="mb-1"><a class="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded" href="#">Services</a></li>
          <li class="mb-1"><a class="block p-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded" href="#">Testimonials</a></li>
        </ul></div>
      <div class="mt-auto">
        <div class="pt-6"><a class="block px-6 py-2 mb-3 text-sm text-center text-gray-500 hover:text-gray-600 font-bold leading-loose border border-gray-100 hover:border-gray-200 rounded" href="#">Sign in</a><a class="block px-6 py-2 mb-2 text-sm text-center text-gray-500 hover:text-gray-600 font-bold leading-loose border border-gray-100 hover:border-gray-200 rounded" href="#">Sign up</a></div>
      </div>
    </nav></div>
</section>
    </div>
  );
}