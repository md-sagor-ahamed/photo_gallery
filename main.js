const unsplashAPI = {
    accessKey: '5duxWC1vAvOf8eshdyqML8HZdwzmA91J7hy_0sV-JJU',
    secretKey: 'bw_cV7TlLSFGS5U2ZeN9ExKZRXg3BvHXxrx5OOICOvQ',
    page: 1,
    async getData(e){
        const res = await fetch(`https://api.unsplash.com/search/photos/?client_id=${this.accessKey}&query=flower&per_page=30&page=${e}`);
        //https://api.unsplash.com/search/photos/?client_id="+clientId+"&query="+query + "&per_page=30&page=" + currPage;
        const val = await res.json();
        return val;
    }
}

// let url = "https://api.unsplash.com/search/photos/?client_id="+clientId+"&query="+query + "&per_page=30&page=" + currPage;


const myFunc = {
    btn(){
        const {prevBtn, nextBtn} = UI.loadSelector();
        let result = 1;
        prevBtn.addEventListener("click", async (e)=>{
            if(result < 2){
                alert("This is a invalid number")
            }else{
                result--;
                const data = await unsplashAPI.getData(result)
                UI.displayPhotoFromApi(data);
            }
        })
        nextBtn.addEventListener("click", async ()=> {
            result++
            const data = await unsplashAPI.getData(result);
            UI.displayPhotoFromApi(data);
        })
        return result;
    }
}



const UI = {
    loadSelector(){
        const photos = document.querySelectorAll(".card-image");
        const title = document.querySelectorAll(".card-title");
        const description = document.querySelectorAll(".decription");
        const previewPhotos = document.querySelector(".preview-section");
        const showImage = document.querySelector(".preview-image");
        const closeBtn = document.querySelector(".close");
        const storage = document.querySelector(".cards");
        const photoCard = document.querySelector(".photo-card");
        const prevBtn = document.querySelector(".prev");
        const nextBtn = document.querySelector(".next");
        return{
            photos,
            title,
            description,
            previewPhotos,
            showImage,
            closeBtn,
            storage,
            photoCard,
            prevBtn,
            nextBtn
        }
    },
    titleZoomEffect(){
        const {storage} =  this.loadSelector();
        const photo = document.querySelector(".card-title");
        storage.addEventListener("click", (e)=>{
            if(e.target.classList === "card-title"){
                console.log("You are right")
            }
            // clientX = e.clientX - storage.offsetLeft
            // clientY = e.clientY - storage.offsetTop
            // photo.style.transform = 'translate(-50%, -50%)'
        })
    },
    displayPhotoFromApi(data){
        const {storage} = this.loadSelector();
        let result = '';
        data.results.forEach(async item => {
            result += `
                        <div class="photo-card">
                        <div class="card-image">
                            <img src="${item.urls.thumb}" class="image" id=${item.id} alt="">
                        </div>
                        <h2 class="card-title">${item.alt_description.slice(0,16)}......</h2>
                        <p class="decription">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic tempore eligendi ipsa autem quas, ipsum exercitationem perspiciatis debitis aliquid nesciunt aperiam. Numquam eveniet laborum impedit.</p>
                        </div>
                        `
        })
        storage.innerHTML = result;
    },
    displayImage(index){
        const {showImage} = this.loadSelector();
        let item = document.getElementById(index).src;
        showImage.src = item
    },
    async init(){
        const {storage, previewPhotos, closeBtn} = this.loadSelector();
                storage.addEventListener('click', (e)=>{
                    if(e.target.classList.contains("image")){
                        const item = e.target.id
                        this.displayImage(item)
                        previewPhotos.classList.add("show");
                    }
                })
        closeBtn.addEventListener("click", ()=> {
            previewPhotos.classList.remove("show")
        })
        const item = myFunc.btn();
        const data = await unsplashAPI.getData(item);
        this.displayPhotoFromApi(data);
        this.titleZoomEffect();
    }
}
UI.init();






