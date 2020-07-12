

export function getIdFromURL(){

    let url = window.location.href;

    let keyword = "/showQuestion";

    let subpath = url.substring(url.lastIndexOf(keyword)+keyword.length+1);

    let id = subpath.includes('/') ? subpath.substring(0, subpath.indexOf('/')) : subpath;
    
    return id;


}

export function getOptionNumber(){

    let url = window.location.href;

    let subpath = "/option_";

    return url.substring(url.lastIndexOf(subpath)+subpath.length);


}

export function getTypeOfQuestions(){


    let url = window.location.href;

    let subpath = "";

    if(url.includes("/unAnsweredQuestions")){

        subpath = "/unAnsweredQuestions";

    }else{

        subpath = "/answeredQuestions";

    }

    return url.substring(url.lastIndexOf(subpath)+1);


}