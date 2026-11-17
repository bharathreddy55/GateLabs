let mathLoader;
export async function renderMath(root=document){
 try{
  mathLoader??=Promise.all([import('katex'),import('katex/dist/katex.min.css')]).then(([module])=>module.default).catch(error=>{mathLoader=null;throw error;});
  const katex=await mathLoader;
  root.querySelectorAll('.katex-render').forEach(element=>{const source=element.dataset.latex;if(source)katex.render(source,element,{throwOnError:false,trust:false,strict:'warn',maxExpand:1000});});
 }catch{
  root.querySelectorAll('.katex-render').forEach(element=>{element.textContent='Formula (text): '+element.dataset.latex;element.title='Math renderer unavailable. Reopen this page to retry.';});
 }
}
let pdfLoader;
export async function loadPdfDocument(data){
 try{
  pdfLoader??=Promise.all([import('pdfjs-dist/build/pdf.mjs'),import('pdfjs-dist/build/pdf.worker.min.mjs?url')]).then(([pdf,worker])=>{pdf.GlobalWorkerOptions.workerSrc=worker.default;return pdf;}).catch(error=>{pdfLoader=null;throw error;});
  const pdf=await pdfLoader;const task=pdf.getDocument({data});const document=await task.promise;return {numPages:document.numPages,getPage:number=>document.getPage(number),destroy:()=>task.destroy()};
 }catch(error){console.warn('PDF import failed',error);throw new Error('The PDF could not be read. Retry the upload, use a text PDF without password protection, or import structured text instead.');}
}
