package com.logitrack.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.logitrack.dto.AuditoriaDto;
import com.logitrack.enums.TipoOperacion;
import com.logitrack.services.AuditoriaService;

class AuditoriaControllerTest {

    @Test
    void listarTodasFiltraPorUsuarioParaEmpleados() {
        AuditoriaService auditoriaService = mock(AuditoriaService.class);
        AuditoriaController controller = new AuditoriaController(auditoriaService);

        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("empleado1");
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_EMPLEADO"));
        when(authentication.getAuthorities()).thenReturn(authorities);

        when(auditoriaService.listarTodas()).thenReturn(List.of(
                new AuditoriaDto(1L, TipoOperacion.INSERT, LocalDateTime.now(), "empleado1", "Movimiento", 1L, null, "ok"),
                new AuditoriaDto(2L, TipoOperacion.INSERT, LocalDateTime.now(), "admin", "Movimiento", 2L, null, "otro")
        ));

        ResponseEntity<List<AuditoriaDto>> response = controller.listarTodas(authentication);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(1, response.getBody().size());
        assertEquals("empleado1", response.getBody().get(0).getUsuario());
    }
}
