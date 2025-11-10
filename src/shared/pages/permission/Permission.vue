<template>
    <section class="permission">
        <div class="permission__content flex flex-col items-center gap-[20px]">
            <h1 class="title">Врата закрыты</h1>
            <p class="text text-center w-[500px]">
                Ты попытался войти в зал, куда пока нет допуска.  
                Возможно, стражи Чертогов не узнали тебя… или твой ключ пока не наделён силой доступа.
            </p>
            <ul>
                <li class="text">
                    Обратись к <span class="highlight">гильдмастеру</span> или <span class="highlight">администратору</span>, чтобы получить разрешение.
                </li>
                <li class="text">
                    Если считаешь, что это ошибка, попробуй пройти испытание позже — возможно, врата откроются.
                </li>
                <li class="text">
                    Если путь действительно закрыт, самое время вернуться в свои
                    <RouterLink to="/profile" class="link">покои героя</RouterLink>.
                </li>
            </ul>
            <p class="text">
                «Не каждый путник может ступить в священные залы — но каждый способен найти свой путь.»
            </p>
        </div>
    </section>
</template>
