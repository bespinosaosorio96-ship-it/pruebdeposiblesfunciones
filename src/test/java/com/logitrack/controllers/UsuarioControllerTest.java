package com.logitrack.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.logitrack.entities.Usuario;
import com.logitrack.enums.Rol;
import com.logitrack.services.AuthService;
import com.logitrack.services.UsuarioService;

class UsuarioControllerTest {

    @Test
    void listarTodosDevuelveUsuarios() {
        UsuarioService usuarioService = mock(UsuarioService.class);
        AuthService authService = mock(AuthService.class);
        UsuarioController controller = new UsuarioController(usuarioService, authService);

        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNombre("Ana García");
        usuario.setUsername("anagarcia");
        usuario.setRol(Rol.ADMIN);
        usuario.setActivo(true);

        when(usuarioService.listarTodos()).thenReturn(List.of(usuario));

        var respuesta = controller.listarTodos();

        assertEquals(200, respuesta.getStatusCode().value());
        assertEquals("anagarcia", respuesta.getBody().get(0).getUsername());
    }
}
