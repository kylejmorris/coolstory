import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from 'react';
const banana = require('@banana-dev/banana-dev');

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
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
      const promptModded = "A clear, high quality photo showing that " + summary + "highly detailed, cinematic lighting, digital art"
      console.log("MODDED PROMPT: " + promptModded)
      const out = await banana.run("48e6f984-4f85-4b8a-a2aa-6ade981c129e", "cee3a79a-7983-4f39-9974-9fce016fc809", {"prompt": prompt})
      setImages([...images, {"text": promptModded, "image": out.modelOutputs[0].image_base64}]);
    })
  }

  return (
    <div className={styles.container}>
                <input type="text" name="prompt" onChange={(e) => {setPrompt(e.target.value)}} />
          <button onClick={() => {generateImage(prompt)}}>
            Generate story page
          </button>
        {images.map((img) => { return (<p>{img['text']}<img src={"data:image/png;base64," + img['image']} /></p>)
        })}
      <Head>
        <title>Story Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}