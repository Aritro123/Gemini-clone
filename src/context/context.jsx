import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext()

const ContextProvider =(props)=>{

    const [input, setInput] = useState(""); // to save input data
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);  // To store previous prompt
    const [showResult, setShowResult] = useState(false); // once its true it will hide  the welcome page and open chat box
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara =(index, nextWord)=>{

    }
    
    const onSent = async (prompt) =>{
        console.log(prompt== "");
        
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
            response = await run(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await run(input)
        }
        let responseArray = response.split("**")
        let newResponse = "";
        for(let i = 0; i< responseArray.length; i++){
            if(i===0 || i%2 !== 1){
                newResponse += responseArray[i]
            }else{
                newResponse += "<b>"+responseArray[i]+"</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        setResultData(newResponse2)
        setLoading(false)
        setInput("")
    }
    // onSent("what is react")


    const contextValue ={
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        
    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider