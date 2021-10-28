import { writable } from 'svelte/store'

//선택한 폴더 
export let selectedFolder = writable(null)

//캔버스 이미지 On/Off
//localStorage
let ls = { "canvasToggle": "true" };

if (localStorage.getItem("ls") == null) {
    localStorage.setItem("ls", JSON.stringify(ls))
}
ls = JSON.parse(localStorage.getItem("ls"));

export let canvasToggle = writable(ls.canvasToggle)

canvasToggle.subscribe((value) => {
    ls.canvasToggle = value;
    localStorage.setItem("ls", JSON.stringify(ls))
})