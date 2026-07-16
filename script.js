*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,Helvetica,sans-serif;
}

body{
    background:#0f172a;
    color:#fff;
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:100vh;
    padding:20px;
}

.container{
    width:100%;
    max-width:430px;
    background:#1e293b;
    border-radius:20px;
    padding:20px;
    box-shadow:0 10px 30px rgba(0,0,0,.4);
}

h1{
    text-align:center;
    margin-bottom:15px;
}

.subtitle{
    text-align:center;
    color:#cbd5e1;
    margin-bottom:25px;
    line-height:1.6;
}

#startBtn{
    width:100%;
    padding:15px;
    border:none;
    border-radius:12px;
    background:#22c55e;
    color:#fff;
    font-size:18px;
    cursor:pointer;
}

.top-bar{
    display:flex;
    justify-content:space-between;
    margin-bottom:15px;
    font-size:20px;
}

.progress{
    width:100%;
    height:10px;
    background:#334155;
    border-radius:20px;
    overflow:hidden;
    margin-bottom:15px;
}

#progressBar{
    width:100%;
    height:100%;
    background:#22c55e;
    transition:width 1s linear;
}

.questionNo{
    text-align:center;
    margin-bottom:15px;
    color:#cbd5e1;
}

#playerImage{
    width:100%;
    aspect-ratio:1/1;
    object-fit:cover;
    border-radius:15px;
    background:#111827;
    margin-bottom:15px;
}

#resultText{
    text-align:center;
    min-height:30px;
    margin-bottom:15px;
}

.answers{
    display:grid;
    gap:12px;
}

.answer{
    padding:15px;
    border:none;
    border-radius:12px;
    background:#334155;
    color:white;
    font-size:17px;
    cursor:pointer;
    transition:.25s;
}

.answer:hover{
    background:#475569;
}

.answer:disabled{
    cursor:not-allowed;
}

#revealScreen{

    position:fixed;

    inset:0;

    background:rgba(15,23,42,.96);

    display:none;

    justify-content:center;

    align-items:center;

    flex-direction:column;

    z-index:999;

    padding:20px;

}

#revealImage{

    width:260px;

    height:260px;

    object-fit:cover;

    border-radius:20px;

    margin:25px 0;

}

#revealTitle{

    font-size:40px;

}

#revealName{

    font-size:30px;

}
