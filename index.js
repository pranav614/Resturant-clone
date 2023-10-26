document.addEventListener('DOMContentLoaded', function() {
    let cartItems = [];
    let search=document.getElementById('search');
    search.addEventListener('input', () => {
        let inputVal = search.value.toLowerCase();
        let addCart = document.querySelectorAll(".dishContainer");
        addCart.forEach((element) => {
            let titleTxt = element.querySelector('.title').textContent.toLowerCase();
            let imgAlt = element.querySelector('.foodImg').alt.toLowerCase();
            let ratingTxt = element.querySelector('.ratingContainer ').textContent.toLowerCase();
            let heading = element.closest('.collection').previousElementSibling.textContent.toLowerCase();
            if (titleTxt.includes(inputVal) || imgAlt.includes(inputVal) || ratingTxt.includes(inputVal)|| heading.includes(inputVal) ) {
                element.style.display = "";
            } else {
                element.style.display = "none";
            }
        });
    });

    class collection {
        constructor(dataId, title, price) {
            this.title = title;
            this.price = price;
            this.dataId = dataId;
            
            
        }

        render() {
            return `            
                <div class="cartList" data-id="${this.dataId}">
                    <p>${this.title}</p>
                    <div class="cart-price-container">
                        <p><i class="fa-solid fa-indian-rupee-sign fa-xs price"></i>${this.price}</p>
                        <p><span id="dec">-</span><span class="quantityElement">1</span><span id="inc">+</span></p>
                    </div>
                </div>`;
        }
    }

    const ifExistingItem = (item) => {
        const existingItem = cartItems.find((cartItem) => cartItem.dataId === item);
        return existingItem !== undefined
            
        
    }
  

    const cartAddingToHtml = (collectionList) => {
        let cartHtml = collectionList.render();
        let newContainer = document.createElement("div");
        newContainer.classList.add("hello");
        newContainer.innerHTML = cartHtml;
        newContainer.dataset.id = collectionList.dataId;
        let componentList = document.querySelector(".componentList");
        componentList.append(newContainer);
        cartItems.push(collectionList);
        let inc=newContainer.querySelector('#inc');
        let dec=newContainer.querySelector('#dec');
        let quantityContainer=newContainer.querySelector('.quantityElement');
        let quantityNumber= quantityContainer.textContent;
        let cartPrice=collectionList.price;

        let totalContainerNumber=document.getElementById('totalContainerNumber');
        totalNumber=parseFloat(totalContainerNumber.textContent);

        totalNumber = totalNumber+parseFloat(cartPrice);
 
        totalContainerNumber.textContent=totalNumber;

        

        inc.addEventListener('click', () =>{
            quantityNumber =parseFloat(quantityNumber) +1;
            if(quantityNumber>=1 && quantityNumber <= 10){
                quantityContainer.textContent=quantityNumber;
                totalNumber=totalNumber+parseFloat(cartPrice);
                totalContainerNumber.textContent=totalNumber;
            }
            
        })

        dec.addEventListener('click',()=>{
            quantityNumber=parseFloat(quantityNumber)-1;
            if(quantityNumber>=1){
                quantityContainer.textContent=quantityNumber;
                totalNumber=totalNumber-parseFloat(cartPrice);
                totalContainerNumber.textContent=totalNumber;
            }
        })

       
    }

    let pointer1 = (event1) => {
        
        let pointerDom = event1.currentTarget;
        let pointerParent = pointerDom.parentElement;
        let dishContainer = pointerParent.parentElement;
        let dishTitleSel = dishContainer.querySelector(".title");
        let dishTitle = dishTitleSel.textContent;
        let dishPriceSel = dishContainer.querySelector(".price");
        let dishPrice = dishPriceSel.textContent;
        let dataContainer = dishContainer.querySelector(".subContainer");
        let dataset = dataContainer.dataset.id;
        const exists = ifExistingItem(dataset);
        if (!exists) {
            let collectionList = new collection(dataset, dishTitle, dishPrice);
            cartAddingToHtml(collectionList);
        } else {
            console.log('Element exists');  
            const index = cartItems.findIndex(item => item.dataId === dataset);
        if (index !== -1) {
            cartItems.splice(index, 1);
        }
        const cartElementToRemove = document.querySelector(`.hello[data-id="${dataset}"]`);
        if (cartElementToRemove) {
            cartElementToRemove.remove();
        }
        totalNumber -= parseFloat(dishPrice);
        totalContainerNumber.textContent = totalNumber;
        pointerDom.classList.remove("fa-solid");
        }
    }

    const wishlist = () => {
        let addCart = document.querySelectorAll(".addCart");
        

        addCart.forEach(element => {
            element.addEventListener("click", (element) => {
                if(element){
                    const class1=element.currentTarget;
                    class1.classList.toggle("fa-solid");
                     pointer1(element);
                }
                else{
                    console.log('does not exist');
                }
             
            });
        });
    }

    wishlist();
});
