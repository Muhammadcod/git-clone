const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');
const spanish = document.querySelectorAll('p.keep');

// Select tab content item
function selectItem(e) {
    removeBorder();

    removeShow();

    this.classList.add('tab-border');

    const tabContentItem = document.querySelector(`#${this.id}-content`);

    tabContentItem.classList.add('show');
}

// Remove bottom borders from all tab items
function removeBorder() {
    tabItems.forEach(item => {
        item.classList.remove('tab-border');
    });
}

// Remove show class from all content items
function removeShow() {
    tabContentItems.forEach(item => {
        item.classList.remove('show');
    });
}

// Listen for tab item click
tabItems.forEach(item => {
    item.addEventListener('click', selectItem);
});

const github_data = {
    "token": "a601412f8143fe758a372e04e7df63e4dc6e4d73",
    "username": "Muhammadcod"
};

const query = `{
            user(login:"${github_data.username}" ){
             name
             avatarUrl
            repositories(first:20, orderBy: {field: CREATED_AT, direction: DESC }){
                nodes{
                    id,
                    name,
                    updatedAt,
                    isPrivate,
                    forkCount,
                    stargazerCount,
                    languages(first:10){
                        nodes{
                        name
                            }
                        }
                    }
                 }
                 name,
             avatarUrl,
            }

}`

const ul = document.getElementById('list-grid');




function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}



const baseUrl = "https://api.github.com/graphql";

const headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${github_data.token}`,
};


const languages_icons = {
    Python: "logos-python",
    "Jupyter Notebook": "logos-jupyter",
    HTML: "#D44826",
    CSS: "#9081A6",
    JavaScript: "#E4D457",
    "C#": "logos-c-sharp",
    Java: "logos-java",
};

const badge = document.getElementById("badge");
function getLength(element) {
   return badge.innerHTML = `${element}`;

}

fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({query}),
}).then(res => res.text()).then((txt) => {
    const data = JSON.parse(txt);
    const repositories = data["data"]['user']["repositories"]["nodes"]
    // console.log(repositories)

    let newRepo = {data: []};

    for (let i = 0; i < repositories.length; i++) {
        let obj = repositories[i];
        let langobjs = obj["languages"]["nodes"];
        let newLangobjs = [];
        for (let j = 0; j < langobjs.length; j++) {
            if (langobjs[j]["name"] in languages_icons) {
                newLangobjs.push({
                    name: langobjs[j]["name"],
                    fontawesomeClass: languages_icons[langobjs[j]["name"]],
                });
            }
        }
        obj["languages"] = newLangobjs;
        newRepo["data"].push(obj);
        }


    return newRepo.data.map(rep => {
        // console.log("Fetching the Pinned Projects Data.", rep);
     let  length  = newRepo.data.length;

        let item = createNode('li'),
             div = createNode('div'),
             detail = createNode('div'),
             header = createNode('h6'),
             star = createNode('span'),
             button = createNode('span'),
             fork = createNode('span'),
             update = createNode('span'),
             link = createNode('a'),
             lan = createNode('span'),
             detailWrap = createNode('div')

         header.classList.add("title");
         header.innerHTML = `<a href="">${rep.name}</a>   `;
         div.classList.add("item-wrapper");
         detail.classList.add("item-details");
         item.classList.add("item");
        button.innerHTML = `<i class="far fa-star"></i> star`;
        button.classList.add("button")
        star.innerHTML = `<i class="far fa-star"></i> ${rep.stargazerCount}`;


         fork.innerHTML = `<i class="fas fa-code-branch" ></i> ${rep.forkCount}`;
         update.innerHTML = `Updated ${rep.updatedAt}`;
         lan.innerHTML = `<i class="fas fa-circle"  ></i> <span class="cover">${rep.languages[0] ? rep.languages[0].name : rep.languages}</span>` ;
        lan.style.color =  rep.languages[0] ? rep.languages[0].fontawesomeClass : rep.languages[1];
        lan.style.display = !rep.languages[0] ? "none" : "inline";
        star.style.display = rep.stargazerCount === 0 ? "none" : "inline";
        fork.style.display = rep.forkCount === 0 ? "none" : "inline";
        console.log(rep)
        append(detail, lan);
        append(detail,  star);
        append(detail,  fork);
        append(detail, update);
        append(detailWrap, header);
        append(detailWrap, detail);
        append(div, detailWrap);
        append(div, button);
        append(item, div);
        append(ul, item);
getLength(length)
        // emptySpan ? span.style.display = "none" : span.style.display = "inline"
    })

}).catch(error => console.error(error));



