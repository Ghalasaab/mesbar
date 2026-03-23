import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Lang = 'en' | 'ar';
type TrackKey = 'software'|'cyber'|'data'|'ai'|'devops'|'product'|'project'|'hr'|'ba'|'ops';

interface LangStore { lang: Lang; setLang: (l: Lang) => void; }
export const useLangStore = create<LangStore>()(persist((set) => ({ lang:'en', setLang:(lang)=>set({lang}) }),{ name:'mesbar-lang' }));

interface CareerTestStore {
  currentQuestion: number; answers: Record<string,number>; result: any; isSubmitting: boolean;
  setAnswer:(id:string,i:number)=>void; nextQuestion:()=>void; prevQuestion:()=>void;
  goToQuestion:(n:number)=>void; setResult:(r:any)=>void; setSubmitting:(v:boolean)=>void; reset:()=>void;
}
export const useCareerTestStore = create<CareerTestStore>()(persist((set)=>({
  currentQuestion:0, answers:{}, result:null, isSubmitting:false,
  setAnswer:(id,i)=>set(s=>({answers:{...s.answers,[id]:i}})),
  nextQuestion:()=>set(s=>({currentQuestion:s.currentQuestion+1})),
  prevQuestion:()=>set(s=>({currentQuestion:Math.max(0,s.currentQuestion-1)})),
  goToQuestion:(n)=>set({currentQuestion:n}),
  setResult:(result)=>set({result}),
  setSubmitting:(isSubmitting)=>set({isSubmitting}),
  reset:()=>set({currentQuestion:0,answers:{},result:null,isSubmitting:false}),
}),{name:'mesbar-test'}));

const defaultCvData = { fullName:'',email:'',phone:'',location:'',linkedin:'',github:'',website:'',summary:'',targetRole:'',targetTrack:'',education:[],experience:[],skills:[],projects:[],certifications:[] };
interface CvStore {
  cvData: any; atsResult: any; isEnhancing: boolean;
  setCvField:(f:string,v:any)=>void; setCvData:(d:any)=>void; setAtsResult:(r:any)=>void; setEnhancing:(v:boolean)=>void; reset:()=>void;
}
export const useCvStore = create<CvStore>()(persist((set)=>({
  cvData:defaultCvData, atsResult:null, isEnhancing:false,
  setCvField:(field,value)=>set(s=>({cvData:{...s.cvData,[field]:value}})),
  setCvData:(data)=>set(s=>({cvData:{...s.cvData,...data}})),
  setAtsResult:(atsResult)=>set({atsResult}),
  setEnhancing:(isEnhancing)=>set({isEnhancing}),
  reset:()=>set({cvData:defaultCvData,atsResult:null}),
}),{name:'mesbar-cv'}));

interface InterviewStore {
  targetRole:string; targetTrack:string; questions:any[]; answers:Record<string,string>;
  evaluations:any[]; report:any; currentQuestion:number; phase:string; isLoading:boolean;
  setSetup:(r:string,t:string)=>void; setQuestions:(q:any[])=>void; setAnswer:(id:string,t:string)=>void;
  addEvaluation:(e:any)=>void; setReport:(r:any)=>void; nextQuestion:()=>void; prevQuestion:()=>void;
  setPhase:(p:string)=>void; setLoading:(v:boolean)=>void; reset:()=>void;
}
export const useInterviewStore = create<InterviewStore>()((set)=>({
  targetRole:'',targetTrack:'',questions:[],answers:{},evaluations:[],report:null,
  currentQuestion:0,phase:'setup',isLoading:false,
  setSetup:(targetRole,targetTrack)=>set({targetRole,targetTrack}),
  setQuestions:(questions)=>set({questions}),
  setAnswer:(id,text)=>set(s=>({answers:{...s.answers,[id]:text}})),
  addEvaluation:(e)=>set(s=>({evaluations:[...s.evaluations.filter((ev:any)=>ev.questionId!==e.questionId),e]})),
  setReport:(report)=>set({report}),
  nextQuestion:()=>set(s=>({currentQuestion:Math.min(s.currentQuestion+1,s.questions.length-1)})),
  prevQuestion:()=>set(s=>({currentQuestion:Math.max(0,s.currentQuestion-1)})),
  setPhase:(phase)=>set({phase}),
  setLoading:(isLoading)=>set({isLoading}),
  reset:()=>set({targetRole:'',targetTrack:'',questions:[],answers:{},evaluations:[],report:null,currentQuestion:0,phase:'setup',isLoading:false}),
}));

interface DashboardStore { activeView:string; setView:(v:string)=>void; }
export const useDashboardStore = create<DashboardStore>()((set)=>({ activeView:'home', setView:(activeView)=>set({activeView}) }));
