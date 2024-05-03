import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface Output{
    text: string,
    color?: string
}

const Home: React.FC = () => {
    

    const [code, setCode] = useState<string>('print("Hello World!")');
    const [output, setOutput] = useState<Output>({
        text:'',
        color:'white'
    });

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setCode(e.target.value);
    };

    async function handleRun() {
        try {
            let data = {
                code: code
            }
            const response: AxiosResponse = await axios.post('http://localhost:5000/', data);
            if (response.status==201){
                setOutput({
                    text: response.data,
                    color:'red'
                })
            }else{
                setOutput({
                    text:response.data,
                    color:'green'
                });
            }
            
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="flex items-center" >
                <h1 className=" ml-12 mt-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
                    Python Compiler
                </h1>
                <div style={{width:'970px'}} className="flex justify-end" >
                    <Button className="mt-6" onClick={handleRun} >Run</Button>
                </div>

            </div>
            <div className="flex">
                <div className="px-10 mt-6" >
                    <div className="mockup-code">
                        <pre><code>
                            <textarea rows={20} style={{ width: '895px' }} onChange={handleChange} className="bg-transparent outline-none" value={code}  ></textarea>
                        </code></pre>
                    </div>
                </div>
                <div className="px-10 mt-6" >
                    <div className="">
                        <h1 className="mt-6 scroll-m-20 text-2xl d tracking-tight ">
                            Output
                        </h1>
                        <pre><code>
                            <p style={{color:output.color}} >{output.text}</p>
                        </code></pre>
                    </div>
                </div>

            </div>
        </>
    )
};

export default Home;