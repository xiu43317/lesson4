import headers from './headers'

function handleError(res:any,err:any){
    res.writeHead(400, headers);
    let message = ''
    if(err){
        message = err.message
    }else{
        message = "欄位未填寫正確，或無此ID"
    }
    res.write(
      JSON.stringify({
        status: "false",
        message
      })
    );
    res.end();
}

export default handleError