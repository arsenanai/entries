<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <router-link class="navbar-brand" to="/">
      <img :src="logo" alt="Logo" width="24" height="24" class="d-inline-block align-text-top">
      {{brand}}
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="true" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-lg-flex justify-content-lg-end" id="navbarNav">
      <ul class="navbar-nav my-2 my-lg-0">
        <li class="nav-item" v-if="authenticated()">
          <router-link
            class="nav-link" active-class="active"
            to="/partners">
            Partners
          </router-link>
        </li>
        <li class="nav-item" v-if="authenticated()">
          <router-link
            class="nav-link" active-class="active"
            to="/subpartners">
            Subpartners
          </router-link>
        </li>
        <li class="nav-item" v-if="authenticated()">
          <router-link
            class="nav-link" active-class="active"
            to="/numbers">
            Numbers
          </router-link>
        </li>
        <li class="nav-item" v-if="authenticated()">
          <router-link
            class="nav-link" active-class="active"
            to="/partner-ids">
            Partner IDs
          </router-link>
        </li>
        <li class="nav-item" v-if="!authenticated()">
          <router-link
            class="nav-link" active-class="active"
            to="/login">
            {{$t('Login')}}
          </router-link>
        </li>
        <li class="nav-item" v-if="authenticated()">
          <router-link
            class="nav-link" active-class="active"
            to="/logout">
            Logout
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="../../images/language.png" height="20"/>
          </a>
          <ul class="dropdown-menu">
            <li v-for="locale in $i18n.availableLocales"
              :key="`locale-${locale}`"
              :value="locale">
              <a class="dropdown-item" @click="$emit('locale-changed', locale)"
              :class="{'active': locale === $i18n.locale}">
                {{ locales[locale] }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import common from '@/mixins/common';
export default {
  name: 'Header',
  mixins: [common],
  data() {
    return {
      logo: import.meta.env.VITE_LOGO_URL,
      brand: import.meta.env.VITE_BRAND_TITLE,
      toggleMenu: false,
    }
  },
}
</script>

<style>
</style>