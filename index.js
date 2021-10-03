onload = () => {
  renderTechnologies();
  handleFormRepoSubmit();
}
let selectedTech = [];

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


const technologies = [
  'React',
  'Javascript',
  'Skala',
  'Java',
  '.Net',
  'Ruby',
  'Rails',
  'React Native',
  'CSS',
  'Ionic',
  'Xamarin',
  'MySQL',
  'Postgres',
  'MongoDB',
  'Git',
  'AWS-CLI',

]