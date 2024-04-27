import headers from './headers'

function handleSuccess(res:any,data:any){
    res.writeHead(200, headers);
    res.write(
      JSON.stringify({
        status: "success",
        data: data,
      })
    );
    res.end();
}

export default handleSuccess