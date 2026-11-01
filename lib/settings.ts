"use client"
import { useEffect, useState } from "react"
import { DEFAULT_CLAUSES, DEFAULT_SIGNERS } from "./defaults"
import type { Clause, Signer } from "./termos"
export type Settings={signers:Signer[];clauses:Clause[]}
export function normalize(s:Settings):Settings{const u=s.signers.find(x=>x.kind==="usuario")??DEFAULT_SIGNERS[0];return {...s,signers:[u,...s.signers.filter(x=>x.kind!=="usuario")]}}
export function useSettings():[Settings,React.Dispatch<React.SetStateAction<Settings>>,boolean,string]{const [settings,setSettings]=useState<Settings>({signers:DEFAULT_SIGNERS,clauses:DEFAULT_CLAUSES});const [loaded,setLoaded]=useState(false);const [status,setStatus]=useState("salvando");useEffect(()=>{fetch("/api/settings",{cache:"no-store"}).then(r=>r.json()).then(d=>{setSettings(normalize(d??{signers:DEFAULT_SIGNERS,clauses:DEFAULT_CLAUSES}));setLoaded(true);setStatus("salvo")}).catch(()=>{setLoaded(true);setStatus("erro")})},[]);useEffect(()=>{if(!loaded)return;setStatus("salvando");const t=setTimeout(()=>{fetch("/api/settings",{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify(normalize(settings))}).then(r=>{if(!r.ok)throw new Error();setStatus("salvo")}).catch(()=>setStatus("erro"))},600);return()=>clearTimeout(t)},[settings,loaded]);return [settings,setSettings,loaded,status]}
