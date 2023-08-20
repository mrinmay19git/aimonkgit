
const tree = {
    name: 'root',
    children: [{
            name: 'child1',
            children: [{
                    name: 'child1-child1',
                    data: "c1-c1 Hello"
                },
                {
                    name: 'child1-child2',
                    data: "c1-c2 JS"
                }
            ]
        },
        {
            name: 'child2',
            data: "c2 World"
        }
    ]
};

function createTagView(tagData) {
    
    const tagView = document.createElement('div');
    tagView.className = 'tree-node';
    tagView.dataset.tagName = tagData.name;
    const tagHeader = document.createElement('div');
    tagHeader.className = 'tag-header';
    tagHeader.style.backgroundColor="lightblue";

    const collapseButton = document.createElement('button');
    collapseButton.style.color="yellow";
    collapseButton.className = 'collapse-button';
    collapseButton.addEventListener('click', () => toggleCollapse(tagView));
    tagHeader.appendChild(collapseButton);

    const tagName = document.createElement('div');
    tagName.className = 'tag-name';
    tagName.textContent = tagData.name;
    tagName.addEventListener('click', () => editTagName(tagName));
    tagHeader.appendChild(tagName);

    tagView.appendChild(tagHeader);

    const dataInput = document.createElement('input');
    dataInput.type = 'text';
    dataInput.className = 'data-input';
    dataInput.value = tagData.data || '';
    dataInput.addEventListener('input', (event) => updateData(tagData, event.target.value));

    
    tagView.appendChild(dataInput);

    const addChildButton = document.createElement('button');
    
    addChildButton.textContent = 'Add Child';
    addChildButton.className = 'add-child-button';
    addChildButton.addEventListener('click', () => addChild(tagView, tagData));
    tagView.appendChild(addChildButton);
    const subChildList = document.createElement('div');
    subChildList.className = 'child-list';
    tagView.appendChild(subChildList);
    if (tagData.children) {
        tagData.children.forEach(child => {
            const childTagView = createTagView(child);
            subChildList.appendChild(childTagView);
        });
    }

    return tagView;
}

function toggleCollapse(tagView) {
    const subChildList = tagView.querySelector('.child-list');
    const collapseButton = tagView.querySelector('.collapse-button');

    const isRoot = tagView === document.getElementById('app').querySelector('.tree-node');

    if (subChildList) {
        subChildList.classList.toggle('collapsed');
        collapseButton.textContent = subChildList.classList.contains('collapsed') ? '>' : 'v';
    }

    if (isRoot) {
        tagView.style.display = subChildList.classList.contains('collapsed') ? 'none' : 'block';
    }

     if (tagView.dataset.tagName === 'child1') {
         const subChildViews = tagView.querySelectorAll('.tree-node[data-tag-name^="child1-child"]');
         subChildViews.forEach(subChildView => {
             subChildView.style.display = subChildList.classList.contains('collapsed') ? 'none' : 'block';
         });
     } 
     
     
      if (tagView.dataset.tagName === 'child2') {
         const subChildViews = tagView.querySelectorAll('.tree-node[data-tag-name^="child2-child"]');
         subChildViews.forEach(subChildView => {
             subChildView.style.display = subChildList.classList.contains('collapsed') ? 'none' : 'block';
         });
     } 
}

function addChild(parentView, parentData) {
    const newChild = {
        name: `New Child`,
        children: []
    };
    parentData.children.push(newChild);
    updateUI();
}

function updateData(tagData, newData) {
    tagData.data = newData;
    updateUI();
}

function editTagName(tagNameElement) {
    const tagNameText = tagNameElement.textContent;
    tagNameElement.innerHTML = '';

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = tagNameText;
    inputField.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            tagData.name = event.target.value;
            tagNameElement.textContent = event.target.value;
        }
    });

    tagNameElement.appendChild(inputField);
    inputField.focus();
}

function exportTree() {
    const exportedData = JSON.stringify(tree, ['name', 'children', 'data'], 2);
    console.log(exportedData);
}

function updateUI() {
    
    const app = document.getElementById('app');
    app.innerHTML = '';

    const addRootButton = document.createElement('button');
    addRootButton.textContent = 'Add Root Child';
    addRootButton.addEventListener('click', () => addChild(app, tree));
    app.appendChild(addRootButton);

    const exportButton = document.getElementById('export-button');
    exportButton.addEventListener('click', exportTree);

    const rootTagView = createTagView(tree);
    app.appendChild(rootTagView);
}

function toggleChild1Visibility() {
    const child1TagView = document.querySelector('.tree-node[data-tag-name="child1"]');
    const child2TagView = document.querySelector('.tree-node[data-tag-name="child2"]');
    if (child1TagView) {
        child1TagView.style.display = child1TagView.style.display === 'none' ? 'block' : 'none';
      
    }
    
    
     if (child2TagView) {
        child2TagView.style.display = child2TagView.style.display === 'none' ? 'block' : 'none';
    }
}

updateUI();