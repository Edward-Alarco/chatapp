<?php 
    session_start();
    include_once "config.php";
    $fname = mysqli_real_escape_string($conn, $_POST['fname']);
    $lname = mysqli_real_escape_string($conn, $_POST['lname']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    if(!empty($fname) && !empty($lname) && !empty($email) && !empty($password)){
        //checamos si el email es valido
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            //validamos si el email esta en la bd
            $sql = mysqli_query($conn, "SELECT email FROM users WHERE email = '{$email}'");
            if(mysqli_num_rows($sql) > 0){ //si es que ya hay un usuario con ese email
                echo "Ya existe una cuenta con el correo $email";
            }else{
                if(isset($_FILES['image'])){
                    $img_name = $_FILES['image']['name'];
                    $img_type = $_FILES['image']['type'];
                    $tmp_name = $_FILES['image']['tmp_name'];

                    $img_explode = explode('.',$img_name);
                    $img_ext = end($img_explode);

                    $extensions = ['png','jpeg','jpg'];
                    if(in_array($img_ext, $extensions) === true){
                        $time = time(); // esto regresara el tiempo actual para subir el archivo

                        //subimos el archivo a un folder - guardar img
                        $new_img_name = $time.$img_name;
                        if(move_uploaded_file($tmp_name, "images/".$new_img_name)){
                            $status = 'Active now';//una vez registrada la cuenta, su status cambia a activo
                            $random_id = rand(time(), 10000000); //creando un random id para el usuario

                            //insertamos la data del usuario a la bd
                            $sql2 = mysqli_query($conn, "INSERT INTO users (unique_id,fname,lname,email,password,img,status)
                                                VALUES ({$random_id},'{$fname}','{$lname}','{$email}','{$password}','{$new_img_name}','{$status}')");
                            
                            if($sql2){//si es que la data se guarda en la bd
                                $sql3 = mysqli_query($conn, "SELECT * FROM users WHERE email='{$email}'");
                                if(mysqli_num_rows($sql3)>0){
                                    $row = mysqli_fetch_assoc($sql3);
                                    $_SESSION['unique_id'] = $row['unique_id'];
                                    echo "gg";
                                }
                            }else{
                                echo "Ocurrió un problema al guardar los datos!";
                            }
                        }

                    }else{
                        echo "Por favor sube una foto con el formato valido (png, jpeg, jpg)";
                    }
                }else{
                    echo "Por favor sube una foto";
                }
            }
        }else{
            echo "$email - No es un email valido";    
        }
    }else{
        echo "Asegurate de llenar todos los campos";
    }
?>