
 
  document.getElementById("formularioLogin").addEventListener("submit", function(event) {
    event.preventDefault(); 
  
    var usuario = document.getElementById("usuarioGithub").value;
    axios.get(`https://api.github.com/users/${usuario}`)
      .then(function(response) {
        var usuarioData = response.data;
        localStorage.setItem("logins", JSON.stringify(usuarioData)); // armazena os dados do usuário
        window.location.href = "index.html"; // redireciona para a página "index.html"
      })
      .catch(function(error) {
        alert("Usuário não encontrado no GitHub!"); // alerta caso não consiga encontrar o usuário
      });
  });
  