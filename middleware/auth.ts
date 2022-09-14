// import localStorage

export default defineNuxtRouteMiddleware((to) => {
  const name = useCookie("nameCookie");

  if (!name.value && to.path === "/chat") {
    return navigateTo("/");
  } else if (name.value && to.path === "/") {
    return navigateTo("chat");
  }
});
