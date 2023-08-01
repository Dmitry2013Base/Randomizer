<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <router-link to="/" class="nav-link navbar-brand nav-link-hover">Рандомайзер</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Переключатель навигации">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent" style="justify-content: end;">
                    <ul class="navbar-nav mb-2 mb-lg-0">
                        <li class="nav-item">
                            <router-link to="/number" class="nav-link nav-link-hover">Числа</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/password" class="nav-link nav-link-hover">Пароли</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/fortune" class="nav-link nav-link-hover">Колесо фортуны</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/cube" class="nav-link nav-link-hover">Игральная кость</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>
    
<script>
    import 'bootstrap/dist/css/bootstrap.min.css'
    import 'bootstrap/dist/js/bootstrap.bundle.js'
</script>
      
<style scoped>
    .nav-link-hover:hover {
        color: red;
    }
</style>
      