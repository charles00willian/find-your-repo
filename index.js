let selectedTech = [];
onload = () => {
  selectedTech = JSON.parse(localStorage.getItem('techs')) || [];

  renderRepositories();
  renderTechnologies();
  handleFormRepoSubmit();
}

showScreen = (screenName = '') => {
  const mainChildren = Array.from(document.getElementById('main').children);

  mainChildren.forEach(child => {
    if(child.id !== screenName) {
      child.classList.add('hidden');
      return;
    }

    child.classList.remove('hidden')
  })
}

const isTechSelected = (t = '') => selectedTech.some(tech => tech === t);

const renderTechnologies = (filter = '') => {
  const techlist = document.querySelector('#technologies');
  techlist.innerHTML = '';
  const filteredTech = technologies.filter(e => e.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
  filteredTech.forEach((t) => {
    const row = `
      <span class="checkbox-wrapper">
        <input 
          type="checkbox" 
          id="checkbox-${t}" 
          name="${t}" 
          value="${t}" 
          ${isTechSelected(t) ? 'checked' : ''}>
        <label for="scales" class="checkbox-label">
          ${t}
        </label>
      </span>
    `
    
    techlist.insertAdjacentHTML('beforeend', row);
    const checkbox = document.getElementById(`checkbox-${t}`);
    checkbox.addEventListener('input', (event) => {
      if (event.target.checked) {
        addSelectedTech(event.target.value)
      } else {
        removeSelectedTech(event.target.value)
      }
    });
    
  });
}

const handleFormRepoSubmit = () => {
  const form = document.querySelector('#find-repo-form');

  form.onsubmit = (event) => {
    event.preventDefault();
    
    localStorage.setItem('techs', JSON.stringify(selectedTech));

    showScreen('repo-list-screen');
    renderRepositories(selectedTech);
  }
}

const addSelectedTech = (tech) => {
  const foundTech = selectedTech.includes(tech);
  if(!foundTech){
    selectedTech.push(tech);
  }
}

const removeSelectedTech = (tech) => {
  const foundTech = selectedTech.includes(tech);

  if(!foundTech){
    return;
  }

  selectedTech = selectedTech.filter(t => t !== tech);
}

const handleInputChange = (e) => renderTechnologies(e.target.value);

const renderRepositories = (techs = []) => {
  const repos = techs.length 
                ? repositories
                    .filter(r => 
                      r.technologies.some(t => techs.includes(t))
                    ) 
                : repositories;
  const repoList = document.getElementById('repo-list');
  repoList.innerHTML = '';
  repos.forEach(r => {
    const row = `
      <div class="repo-wrapper" >
        <img src="${r.orgPicture || "https://i.pravatar.cc/300"}" alt="avatar" class="repo-owner-image">
        <div class="repo-name-wrapper">
          <span class="repo-name">
            ${r.name}
          </span>
          <span class="repo-technologies">
            ${r.technologies.join(', ')}
          </span>
        </div>
      </div>
    `
    
    repoList.insertAdjacentHTML('beforeend', row);
  })
}

const technologies = [
  'Javascript',
  'Skala',
  'Java',
  'Ruby',
  'CSS',
  'MySQL',
  'Postgres',
  'Kotlin',
  'C',
  'Objective-C',
  'C++',
  'Go'
]

const repositories = [
  {
    orgPicture: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png',
    name: 'React',
    technologies: ['Javascript', 'HTML', 'CSS']
  },
  {
    orgPicture: 'https://avatars.githubusercontent.com/u/317776?s=200&v=4',
    name: 'Spring-boot',
    technologies: ['Java', 'Kotlin']
  },
  {
    orgPicture: 'https://avatars.githubusercontent.com/u/7802525?s=200&v=4',
    name: 'gRPC',
    technologies: ['C++', 'Python', 'C']
  },
  {
    orgPicture: 'https://avatars.githubusercontent.com/u/12101536?s=88&v=4',
    name: 'Ant-design',
    technologies: ['Typescript', 'Javascript', 'Less']
  },
  {
    orgPicture: 'https://avatars.githubusercontent.com/u/15658638?s=88&v=4',
    name: 'Tensorflow',
    technologies: ['C++', 'Python', 'HTML', "Go"]
  },
  {
    orgPicture: 'https://avatars.githubusercontent.com/u/14101776?s=88&v=4',
    name: 'Flutter',
    technologies: ['Dart', 'Objective-C', 'Java', 'C++']
  },
  {
    orgPicture: 'https://avatars.githubusercontent.com/u/11044339?s=120&v=4',
    name: 'Tasmota',
    technologies: ['C', 'C++', 'HTML', 'Python']
  },
  {
    orgPicture: 'https://avatars.githubusercontent.com/u/10418365?s=88&v=4',
    name: 'Marlin',
    technologies: ['Python', 'Javascript', 'C++', 'C']
  }
]