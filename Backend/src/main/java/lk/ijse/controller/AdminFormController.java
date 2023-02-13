package lk.ijse.controller;

import lk.ijse.dto.AdminDTO;
import lk.ijse.dto.CustomerDTO;
import lk.ijse.service.AdminService;
import lk.ijse.util.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("admin")
public class AdminFormController {


    @Autowired
    public AdminService adminService;


    @PostMapping(value = "save_admin",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveAdmin(@ModelAttribute AdminDTO adminDTO) {
        adminService.saveAdmin(adminDTO);
        return new ResponseUtil("OK", "Successfully Registered !", "");
    }

    @DeleteMapping()
    public ResponseUtil deleteAdmin(String code) {
        adminService.deleteAdmin(code);
        return new ResponseUtil("OK", "Successfully Deleted ! " + code, "");
    }

    @GetMapping(value = "get_all_admin",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllAdmin(){
        return new ResponseUtil("OK","Successful",adminService.getAllAdmin());
    }
}
