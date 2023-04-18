<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { reactive } from 'vue'
import { mdiDelete, mdiPlus } from '@mdi/js'

interface Website {
  name: string
  url: string
  icon?: string
}

const websites = useStorage<Website[]>('websites', [])

const newWebsite = reactive({
  name: '',
  url: '',
  icon: '',
})

function addWebsite() {
  if (newWebsite.name && newWebsite.url) {
    if (!newWebsite.url.startsWith('http'))
      newWebsite.url = `https://${newWebsite.url}`
    const url = new URL(newWebsite.url)
    newWebsite.url = url.origin
    websites.value.push({ ...newWebsite })
    newWebsite.name = ''
    newWebsite.url = ''
    newWebsite.icon = ''
  }
}

function removeWebsite(index: number) {
  websites.value.splice(index, 1)
}

function openWebsite(url: string) {
  window.open(url, '_blank')
}

function getFavicon(url: string) {
  let sanitizedUrl = url

  if (!sanitizedUrl.startsWith('http'))
    sanitizedUrl = `https://${sanitizedUrl}`

  return `https://s2.googleusercontent.com/s2/favicons?domain=${new URL(sanitizedUrl).origin}`
}
</script>

<template>
  <v-app>
    <v-main>
      <v-system-bar
        color="primary"
      >
        <v-spacer />
        <span class="font-weight-bold">Liste de liens</span>
        <v-spacer />
      </v-system-bar>
      <v-container>
        <v-row>
          <v-col v-for="(website, index) in websites" :key="index" cols="12" md="4" sm="6">
            <v-hover>
              <template #default="{ isHovering, props }">
                <v-card
                  :elevation="isHovering ? 5 : 3" class="mx-auto my-4" max-width="400" rounded="lg"
                  v-bind="props"
                  @click="openWebsite(website.url)"
                >
                  <v-card-title>
                    <v-avatar class="mr-2" size="20">
                      <v-img :src="website.icon || getFavicon(website.url)" :alt="website.name" />
                    </v-avatar>
                    {{ website.name }}
                  </v-card-title>
                  <v-card-text>
                    {{ website.url }}
                  </v-card-text>
                  <div v-if="isHovering" style="position: absolute; right: 5px; top: 5px;">
                    <v-btn
                      color="red"
                      variant="plain"
                      @click.stop.prevent="removeWebsite(index)"
                    >
                      <v-icon>{{ mdiDelete }}</v-icon>
                    </v-btn>
                  </div>
                </v-card>
              </template>
            </v-hover>
          </v-col>
        </v-row>
        <v-footer app class="d-flex justify-center">
          <v-col cols="12" md="4" sm="6">
            <v-card class="mx-auto my-4" color="#212121" elevation="0" max-width="400">
              <v-card-text>
                <v-text-field
                  v-model="newWebsite.name"
                  class="mb-2"
                  hide-details
                  label="Nom*"
                  autofocus
                />
                <v-text-field
                  v-model="newWebsite.url"
                  class="mb-2"
                  hide-details
                  label="Lien*"
                  @keyup.enter="addWebsite"
                />
                <v-text-field
                  v-model="newWebsite.icon"
                  hide-details
                  label="Icône (URL)"
                  @keyup.enter="addWebsite"
                />
              </v-card-text>
              <v-card-actions class="d-flex justify-center">
                <v-btn
                  :disabled="!newWebsite.name || !newWebsite.url"
                  color="primary"
                  @click="addWebsite"
                >
                  <v-icon>{{ mdiPlus }}</v-icon>
                  Ajouter
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-footer>
      </v-container>
    </v-main>
  </v-app>
</template>
